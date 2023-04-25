Recipe Library: A multi-platform web application that allows people to save cooking recipes to a library and search, share recipes

To use the app on a browser, use the link: https://longlegl.github.io/RecipeLibraryWebapp/


To run the app on localhost:
1. Install nodeJS
2. Download/clone the repository
3. Open your terminal, cd into the repository's folder (the folder that contains the file package.json)
4. Install dependencies using the command: npm install <package name>
    The required packages include: mui, firebase, jspdf, react-router-dom
5. Execute the command: npm start to start up the web app. Upon execution, your browser will open up, leading you to the home page of the web app

Known exceptions:
1. Cannot resolve <package>
    Solutions: npm install <package>
2. ERR_OSSL_EVP_UNSUPPORTED
    Solution: edit the package.json file the following lines
    - replace "start": "react-scripts start" by "start": "react-scripts --openssl-legacy-provider start"
    - replace "build": "react-scripts build" by "build": "react-scripts --openssl-legacy-provider build"
