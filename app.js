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

let employeeList = []
let employeeId = 1

async function main() {
    const list = await inquirer.prompt(
        [
            {
                type: 'list',
                message: 'Add an Employee or Close Application',
                name: 'choice',
                choices: ['Manager', 'Engineer', 'Intern', 'Close']
            }
        ])
    if (list.choice === 'Close'){
        return
    }
    else if (list.choice === 'Manager'){
        const addManager = await inquirer.prompt(
        [
            {
                type: 'input',
                message: 'Enter manager name',
                name: 'name'
            },
            {
                type: 'input',
                message: 'Enter manager email',
                name: 'email'
            },
            {
                type: 'input',
                message: 'Enter manager Office Number',
                name: 'office'
            }
        ])
        const manager = new Manager (addManager.name, employeeId++, addManager.email, addManager.office)
        employeeList.push(manager)
    }
}

main()