const express = require("express");
const bodyparse = require('body-parser');
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));



// Delete Student


const students = [{
    "Id":1,
    "Name":"Ivan",
    "Email":"ivan@aguacate.com",
    "Password":"$2b$10$riSSCMJaJpG0PEIMCB4.Oeio08X7DizlaUS2hC6kdRCAhGt0Rx5BO"},

];

app.use(cors());

const port = process.env.port || 3000;



app.get("/", function (req,res) {
    res.send(students);
});

//You should send a student JSON similar to this one
// {
//     "Id":1,
//     "Name":"Ivan",
//     "Email":"ivan@aguacate.com",
//     "Password":"aguacate"
//  }

app.post("/addstudent",async  function (req,res) {
    let newStudent = req.body;
    newStudent.Password = await bcrypt.hash(req.body.Password,10);
    students.push(newStudent);
    res.send(students);
});

// This endpoint only needs the email and password but no problem if the JSON has more things
app.post("/login", async function (req,res) {

    let localStudent = students.find(({ Email }) => Email == req.body.Email);

    hashPassword = localStudent.Password;
    result = await bcrypt.compare(req.body.Password,hashPassword);
    if (result == true) {
         login =  "Successful login";
    } else{
        login = "Email or password is invalid";
    }
    res.send(login)
});

//You should send a student JSON similar to this one
// {
//     "Id":1,
//     "Name":"Ivan",
//     "Email":"ivan@aguacate.com",
//     "Password":"aguacate"
//  }
app.post("/updatestudent", async function (req,res) {
    let localStudent = students.find(({ Id }) => Id == req.body.Id);
    let localIndex = students.indexOf(localStudent);
    let password = await bcrypt.hash(req.body.Password,10);
    req.body.Password = password
    students[localIndex] = req.body;
    res.send(students)
});

// //This endpoint needs an ID as a JSON
// {
//     "Id":1
//  }
app.post("/getstudent",async  function (req,res) {

    let localStudent = students.find(({ Id }) => Id == req.body.Id);
    res.send(localStudent);
});



// //This endpoint needs an ID as a JSON
// {
//     "Id":1
//  }
app.post("/deletestudent",async  function (req,res) {
    let localStudent = students.findIndex(({ Id }) => Id == req.body.Id);

    students.splice(localStudent,1);
    res.send(students);
});



app.listen( port,() => {
    console.log(`App is running on port:${port}`);
});