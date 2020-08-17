const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Please give a brief description of your project."
    },
    {
      type: "input",
      name: "installation",
      message: "How do you install your project?"
    },
    {
      type: "input",
      name: "usage",
      message: "Please describe how your project will run."
    },
    {
      type: "checkbox",
      name: "license",
      choices: ["MIT License", "GNU Lesser General Public License v3.0", "Mozilla Public License 2.0", "GNU Affero General Public License v3.0", "The Unlicense", "Apache License 2.0", "GNU General Public License v3.0"],
      message: "Choose which license you would like for your project:"
    },
    {
      type: "input",
      name: "contributing",
      message: "Please list any contributers to your project."
    },
    {
      type: "input",
      name: "test",
      message: "Give an example of a test you ran on your project."
    },
    {
      type: "input",
      name: "questions",
      message: "Provide an email where users can contact you with questions."
    }
  ]);
}

function generateMD(answers) {
  return `

  https://img.shields.io/badge/license-${answers.license}-green  
  
# ${answers.title}

## Description
${answers.description}

## Table of Contents
* [Installation](##Installation)
* [Usage](##Usage)
* [Contributers](##Contributers)
* [License](##License)
* [Tests](##Tests)
* [Questions](##Questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project uses the ${answers.license} license.

## Contributers
${answers.contributing}

## Tests
${answers.test}

## Questions
If you have any questions or suggestions, please contact me here:
[${answers.questions}](${answers.questions})`;
}

promptUser()
  .then(function (answers) {
    const MD = generateMD(answers);

    return writeFileAsync("README.md", MD);
  })
  .then(function () {
    console.log("Successfully wrote to README.md");
  })
  .catch(function (err) {
    console.log(err);
  });
