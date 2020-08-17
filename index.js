// Thes are the required modules
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// This const will retain the data to be generated
const writeFileAsync = util.promisify(fs.writeFile);

//Object containing questions that are prompted
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
      type: "list",
      name: "license",
      choices: ["MIT_License", "GNU_Lesser_General_Public_License_v3.0", "Mozilla_Public_License_2.0", "GNU_Affero_General_Public_License_v3.0", "The_Unlicense", "Apache_License_2.0", "GNU_General_Public_License_v3.0"],
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

//Template Literal where data collected from prompts is appended
function generateMD(answers) {
  return `

  ![GitHub](https://img.shields.io/badge/license-${answers.license}-green)
  
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

//This will run the prompts "then" write the file. A log will let you know if it was succesful.
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
