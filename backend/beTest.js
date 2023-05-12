const { query } = require("mssql")
const { json } = require("react-router-dom")

const host = 'localhost'
const port = 5000

let recipeName = 'iceCream'
let authorName = 'A'
let orderOption = 'byRating'
let tags = ['Dessert', 'Side dish']
let tagsString = tags.join(',').replace(' ','%20')
console.log('tagString:',tagsString)
let recipeId = null

queryURL = `http://${host}:${port}/recipe?name=${recipeName}&author=${authorName}&order=${orderOption}&tags=${tagsString}`
getRecURL = `http://${host}:${port}/recipe/${recipeId}`

async function requestDb(url = "") {
    // Default options are marked with *
    console.log('Fetching from', url)
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const jsonData = await response.json();
    return jsonData; // parses JSON response into native JavaScript objects
    
}

let testurl = 'http://localhost:5000/recipe?name=ice&author=A&order=byTime&tags=Dessert'

async function testFunc(){
    data = await requestDb(testurl)
    console.log(data)
}

testFunc()

// requestDb(testurl).then((data) => {
//     console.log(data); // JSON data parsed by `data.json()` call
// });
