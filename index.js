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
      type: "input",
      name: "license",
      message: "What license does your project use?"
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

## Contributers
${answers.contributing}

## Tests
${answers.test}

## Questions
If you have any questions or suggestions, please contact me here:
[${answers.questions}](${answers.questions})`;
}

promptUser()
  .then(function(answers) {
    const MD = generateMD(answers);

    return writeFileAsync("README.md", MD);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });
