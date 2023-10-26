// Task1: initiate app and run server at 3000
var express = require("express");
var Bodyparser = require("body-parser");
var Mongoogse = require("mongoose");
var Cors = require("cors");

var app = new express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: false }));
app.use(Cors());

const path = require('path');
const employeeModel = require("./model/employee");
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));

// Task2: create mongoDB connection 

Mongoogse.connect("mongodb+srv://Smita_08:Chennai88@cluster0.7vhoi24.mongodb.net/EmployeesDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'


app.get('/api/employeelist', async (req, res) => {
    try {
        let data = await employeeModel.find();
        res.send(data);
        console.log("Employees Details now on Screen!")
    }
    catch {
        res.status(400).json({ message: err.message })
    }
});

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {

    try {
        let id = req.params.id;
        let data = await employeeModel.findOne({ _id: id })
        res.send(data);
    }
    catch {
        res.status(400).json({ message: err.message })
    }
});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
    let data = {
        name: req.body.name,
        location: req.body.location,
        position: req.body.position,
        salary: req.body.salary
    }
    let employee = new employeeModel(data);

    try {
        let postedData = await employee.save();
        res.send(postedData);
        console.log("Data add successfully!");
    }
    catch {
        res.status(400).json({ message: err.message })
    }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'


app.delete("/api/employeelist/:id", async (req, res) => {
    try {
        let data = req.body;
        id = req.params.id;
        const updatedResult = await employeeModel.findByIdAndDelete({ "_id": id }, data);
        res.send(updatedResult)
    }
    catch {
        res.status(400).json({ message: err.message });
    }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
    try {
        let data = {
            name: req.body.name,
            location: req.body.location,
            position: req.body.position,
            salary: req.body.salary
        }
        let id = req.body._id;
        const updatedResult = await employeeModel.findOneAndUpdate({ "_id": id }, data);
        res.send(updatedResult);
        console.log("Data upadeted successsfully!");
    }
    catch {
        res.status(400).json({ message: err.message })
    }
});

//! dont delete this code. it connects the front end file.

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, () => {
    console.log("Server Started Listening");
});