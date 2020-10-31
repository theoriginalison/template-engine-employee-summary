const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { off } = require("process");
const teamMembers = []

// array of questions for user
const questions = [
    {
        type: "list",
        message: "Select employee role.",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ],
    },
    {
        type: "input",
        name: "name",
        message: "Enter employee name.",
    },

    {
        type: "input",
        name: "id",
        message: "Enter employee ID.",
    },
    {
        type: "input",
        name: "email",
        message: "Enter employee email.",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number.",
        when: (input) => {
            if (input.role === "Manager") {
                return true
            }
        }
    },
    {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub Username.",
        when: (input) => {
            if (input.role === "Engineer") {
                return true
            }
        }
    },
    {
        type: "input",
        name: "school",
        message: "Enter the intern's school.",
        when: (input) => {
            if (input.role === "Intern") {
                return true
            }
        }
    },
    {
        type: "list",
        message: "Any more employees to add?",
        name: "addEmployee",
        choices: [
            "Yes",
            "No",
        ]
    }
];

function init() {
    inquirer.prompt(questions).then((answers) => {
        if (answers.role === "Manager") {
            const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(newManager);
        }
        else if (answers.role === "Engineer") {
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(newEngineer);
        }
        else {
            const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(newIntern);
        }
        if (answers.addEmployee === "Yes") {
            init();
        }
        else {
            fs.writeFileSync("team.html", render(teamMembers));
        }
    })
};

init();





//create a function to add everything to file-- take the team array and pass it into the render function!! The render function will return a string, and that needs to be stored in a variable, then take that variable, and then that will go inside write.fs file
//const mytemplate = render(teamArray) -- this will give you the string return, and that's what you'll write to the file


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
