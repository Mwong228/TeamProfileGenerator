const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function main() {
    let employeeList = []
    let employeeId = 1

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
        const html = render(employeeList)
        if(!fs.existsSync(OUTPUT_DIR))fs.mkdirSync(OUTPUT_DIR)
        fs.writeFileSync(outputPath, render(employeeList), 'utf-8')
        console.log(`Team is generated. Writing to ${outputPath}`)
        return
    }
    else if (list.choice === 'Manager'){
        const addManager = await inquirer.prompt(
        [
            {
                type: 'input',
                message: 'Enter Manager name',
                name: 'name'
            },
            {
                type: 'input',
                message: 'Enter Manager email',
                name: 'email'
            },
            {
                type: 'input',
                message: 'Enter Manager Office Number',
                name: 'office'
            }
        ])
        const manager = new Manager (addManager.name, employeeId++, addManager.email, addManager.office)
        employeeList.push(manager)
    }
    else if (list.choice === 'Engineer'){
        const addEngineer = await inquirer.prompt(
            [
                {
                    type: 'input',
                    message: 'Enter Engineer name',
                    name: 'name'
                },
                {
                    type: 'input',
                    message: 'Enter Engineer email',
                    name: 'email'
                },
                {
                    type: 'input',
                    message: 'Enter Engineer Github',
                    name: 'github'
                }
            ])
        const engineer = new Engineer (addEngineer.name, employeeId++, addEngineer.email, addEngineer.office)
        employeeList.push(engineer)
    }
    else {
        const addIntern = await inquirer.prompt(
            [
                {
                    type: 'input',
                    message: 'Enter Intern name',
                    name: 'name'
                },
                {
                    type: 'input',
                    message: 'Enter Intern email',
                    name: 'email'
                },
                {
                    type: 'input',
                    message: 'Enter Intern School',
                    name: 'school'
                }
            ])
        const intern = new Intern (addIntern.name, employeeId++, addIntern.email, addIntern.office)
        employeeList.push(intern)
    }
    main()
}

main()