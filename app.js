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

// Array of prompts for user
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

// Collects responses and writes them to the HTML document
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

// Runs the Program
init();