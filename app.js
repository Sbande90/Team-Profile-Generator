const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const employeeTypeQ = [
    {
        type:"rawlist",
        message:"select role",
        name:"employeeRole",
        choices:["Employee", "Engineer", "Manager", "Intern"]
    }
]

 const employeeQuestions= [
     // name,id,email

     {
        type:"input",
        message:"id",
        name:"id",
        validate: function(value){
            if(value){
                return true;
            }else{
               return "this information is required";
            }
        }
    },

    {
        type:"input",
        message:"name",
        name:"name",
        validate: function(value){
            if(value){
                return true;
            }else{
               return "this information is required";
            }
        }
    },

    {
        type:"input",
        message:"email",
        name:"email",
        validate: function(value){
            if(value){
                return true;
            }else{
               return "this information is required";
            }
        }
    }
 ] 


 // engineer
 const engineerQuestions= [
    // name,id,email

    {
       type:"input",
       message:"id",
       name:"id",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
       type:"input",
       message:"name",
       name:"name",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
       type:"input",
       message:"email",
       name:"email",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
    type:"input",
    message:"github",
    name:"github",
    validate: function(value){
        if(value){
            return true;
        }else{
           return "this information is required";
        }
    }
},

] 

// manger
const managerQuestions= [
    

    {
       type:"input",
       message:"id",
       name:"id",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
       type:"input",
       message:"name",
       name:"name",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
       type:"input",
       message:"email",
       name:"email",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
    type:"input",
    message:"officeNumber",
    name:"officeNumber",
    validate: function(value){
        if(value){
            return true;
        }else{
           return "this information is required";
        }
    }
},

] 

// Intern

const internQuestions= [
    

    {
       type:"input",
       message:"id",
       name:"id",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
       type:"input",
       message:"name",
       name:"name",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
       type:"input",
       message:"email",
       name:"email",
       validate: function(value){
           if(value){
               return true;
           }else{
              return "this information is required";
           }
       }
   },

   {
    type:"input",
    message:"school",
    name:"school",
    validate: function(value){
        if(value){
            return true;
        }else{
           return "this information is required";
        }
    }
},

] 
let employeeType ="";
let employeeArray =[];
let engineerArray =[];
let managerArray =[];
let internArray =[];
// name:"employeeRole",
//         choices:["Employee", "Engineer", "Manager", "Intern"]
function creatEmployee (){
    inquirer.prompt(employeeTypeQ).then(answer =>{
        employeeType=answer.employeeRole;
        if(answer.employeeRole=="Employee"){
            inquirer.prompt(employeeQuestions).then(res =>{
                var newEmployee = new Employee(res.name, res.id, res.email);
                employeeArray.push(newEmployee);
                restart();
            })
        };


        if(answer.employeeRole=="Engineer"){
            inquirer.prompt(engineerQuestions).then(res =>{
                var newEmployee = new Engineer(res.name, res.id, res.email, res.github);
                employeeArray.push(newEmployee);
                restart();
            })
        };


        if(answer.employeeRole=="Manager"){
            inquirer.prompt(managerQuestions).then(res =>{
                var newEmployee = new Manager(res.name, res.id, res.email, res.officeNumber);
                employeeArray.push(newEmployee);
                restart();
            })
        };


        if(answer.employeeRole=="Intern"){
            inquirer.prompt(internQuestions).then(res =>{
                var newEmployee = new Intern(res.name, res.id, res.email, res.school);
                employeeArray.push(newEmployee);
                restart();
            })
        }
    })
}

creatEmployee();

function restart(){
    const question = [
        {
            type:"rawlist",
            message:"add another employee?",
            name:"restart",
            choices:["Yes", "No"]
        }
    ];

    inquirer.prompt(question).then(res =>{
        if(res.restart=="Yes"){
            creatEmployee();
        }else{
            // generate htmlfile

            let file = render(employeeArray);
            console.log(file);
        }
    })
}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
