var express = require('express');
var cors = require('cors');
var sql = require("mssql");

var app = express();
app.use(cors())

// config for database
const config = {
  user: 'sqladmin', // better stored in an app setting such as process.env.DB_USER
  password: 'Quang123#', // better stored in an app setting such as process.env.DB_PASSWORD
  server: 'quangsqldatabase.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: 'sqladmin', // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: 'default',
  },
  options: {
    encrypt: true,
  },
}

app.get('/recipe', function (req, res) {

    //localhost:5000/recipe?name=Cream&author=A&order=byRating&tags=Dessert,Side%20dish  
    //Note: %20: ' '

    //Response: 
    // [{"recipeId":2,"name":"whip Cream","authorName":"A","text":"test2","tags":"Main course, Side dish, Dessert","ratingScore":4.6,"addedTime":null,"recipes":"1,2"},
    // {"recipeId":1,"name":"iceCream","authorName":"A","text":"test1","tags":"Side dish, Dessert","ratingScore":3.4,"addedTime":null,"recipes":"1,2"}]
    sql.connect(config, function (err) {
        if (err) console.log(err);

        var {name, author, order, tags} = req.query
        var namePart, authorPart, condition = null
        var request = new sql.Request();
        
        // Select
        query = 'SELECT recipeId, r.name, a.name AS authorName, text, tags, ratingScore, addedTime, recipes FROM Recipe r LEFT JOIN Author a ON r.authorId = a.authorId '

        // Name, Author
        if (name) namePart = 'r.name LIKE ' + '\'%' + name + '%\''
        if (author) authorPart = 'a.name = ' + '\'' + author + '\''
        
        if (namePart) {
            condition = 'WHERE ' + namePart
            if (authorPart) condition += ' AND ' + authorPart
        }
        else if (authorPart) condition = 'WHERE ' + authorPart

        // Tags
        if (tags){
            var tagList = tags.split(",")
            for (let i = 0; i < tagList.length; i++) {
                if (condition) condition += ' AND r.tags LIKE ' + '\'%' + tagList[i] + '%\''
                else condition = 'WHERE r.tags LIKE ' + '\'%' + tagList[i] + '%\''
            }
        }

        if (condition) query += condition

        // Order
        if (order) {
            if (order == "byTime") query += ' ORDER BY addedTime DESC'
            else if (order == "byRating") query += ' ORDER BY ratingScore DESC'
        }

        console.log('Final query: ', query)

        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset['recordset']);
        
        });
    });
});


app.get('/recipe/:id', function (req, res) {

    //localhost:5000/recipe/1
    //Response: 
    // {"recipeId":1,"name":"iceCream","authorName":"A","text":"test1","tags":"Side dish, Dessert","ratingScore":3.4,"addedTime":null,"recipes":"1,2"}
    sql.connect(config, function (err) {
        if (err) console.log(err);

        var recipeId = req.params.id
        var request = new sql.Request();
        
        query = 'SELECT recipeId, r.name, a.name AS authorName, a.authorId as authorId, text, tags, ratingScore, addedTime, recipes FROM Recipe r LEFT JOIN Author a ON r.authorId = a.authorId WHERE recipeId = ' + recipeId

        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            if (recordset['recordset'].length == 0) return res.json({'error': 'Wrong Recipe Id'})
            return res.send(recordset['recordset'][0]);
            
        });
    });
});

app.get('/author', function (req, res) {

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();
        
        // Select
        query = 'SELECT * FROM Author '
        console.log('Final query: ', query)

        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            res.send(recordset['recordset']);
        
        });
    });
});

app.get('/author/:id', function (req, res) {

    //localhost:5000/author/1
    //Response: 
    // {"recipeId":1,"name":"iceCream","authorName":"A","text":"test1","tags":"Side dish, Dessert","ratingScore":3.4,"addedTime":null,"recipes":"1,2"}
    sql.connect(config, function (err) {
        if (err) console.log(err);

        var authorId = req.params.id
        var request = new sql.Request();
        
        // query = 'SELECT recipeId, r.name, a.name AS authorName, text, tags, ratingScore, addedTime, recipes FROM Recipe r LEFT JOIN Author a ON r.authorId = a.authorId WHERE recipeId = ' + authorId
        
        query = 'SELECT a.authorId, a.name, count(*) as recipeCount, avg(ratingScore) as avgRating FROM Recipe r JOIN Author a ON r.authorId = a.authorId WHERE a.authorId = ' + authorId + 'GROUP BY a.authorId, a.name'
        // query = 'SELECT a.authorId, a.name, r.name FROM Recipe r JOIN Author a ON r.authorId = a.authorId WHERE a.authorId = ' + authorId

        console.log('Final query: ', query)
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            if (recordset['recordset'].length == 0) return res.json({'error': 'Wrong author Id'})
            return res.send(recordset['recordset'][0]);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});