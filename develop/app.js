const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const workFellows = [];
const idArray = [];

function app() {

    function addManager() {
        //app must start by adding a manager before adding other team members
        inquirer.prompt([
            {
                name: "managerName",
                type: "input",
                message: "Please enter the Manager or Team Leader's name."
            },
            {
                name: "managerId",
                type: "input",
                message: "Please enter manager Id number."
            },
            {
                name: "managerEmail",
                type: "input",
                message: "Please enter te manager's email."
            },
            {
                name: "managerOfficeNumber",
                type: "input",
                message: "Enter the manager's office room number."
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            workFellows.push(manager);
            idArray.push(answers.managerId);
            addTeamMembers();
        })
    }//end addManager()

    function addTeamMembers() {
        //user must choose a team member type before adding a team member
        inquirer.prompt([
            {
                name: "teamMemberType",
                type: "list",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I am finished adding team members"
                ]
            }
        ]).then(teamMemberChoice => {
            if (teamMemberChoice.teamMemberType == "Engineer") {
                addEngineer();
            } else if (teamMemberChoice.teamMemberType == "Intern") {
                addIntern();
            } else {
                createFinalTeam();
            }
        });
    }//end addTeamMembers()

    function addEngineer() {
        inquirer.prompt([
            {
                name: "engineerName",
                type: "input",
                message: "Enter the engineer's name."
            },
            {
                name: "engineerId",
                type: "input",
                message: "Enter the engineer's id number."
            },
            {
                name: "engineerEmail",
                type: "input",
                message: "Enter the engineer's email."
            },
            {
                name: "engineerGithub",
                type: "input",
                message: "Enter the engineer's Github username."
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            workFellows.push(engineer);
            idArray.push(answers.engineerId);
            addTeamMembers();
        });
    }//end addEngineer()

    function addIntern() {
        inquirer.prompt([
            {
                name: "internName",
                type: "input",
                message: "Enter the intern's name."
            },
            {
                name: "internId",
                type: "input",
                message: "Enter the intern's Id number."
            },
            {
                name: "internEmail",
                type: "input",
                message: "Enter the intern's email."
            },
            {
                name: "internSchool",
                type: "input",
                message: "Enter the intern's current school."
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            workFellows.push(intern);
            idArray.push(answers.internId);
            addTeamMembers();
        })
    }//end addIntern()

    function createFinalTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(workFellows), "utf-8");
    }

    addManager();
}//end app()

app();