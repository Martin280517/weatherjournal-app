// Setup empty JS object to act as endpoint for all routes
const projectData = [{}];

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());         

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 9000;

const server = app.listen(port, listening);

function listening () {
    console.log('server runnning');
    console.log('running on localhost: 9000');
}

// Respond with JS object when a GET request is made to the homepage
app.get('/get', function (req, res) {
    res.send("GET Request worked!");
    res.send(projectData)
});

// Setup POST route and define the function 
app.post('/addData', addData);

function addData(req, res) {
    res.send('POST received');
    let newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse,
    }
    projectData.push(newEntry);
    res.send(projectData);
    console.log(projectData);
    console.log("POST Request worked");
};


