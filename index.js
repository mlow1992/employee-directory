const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        },
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What is the department name?',
            when: (answers) => answers.options === 'Add a department',
            validate: addDepartmentInput => {
                if (addDepartmentInput) {
                    return true;
                } else {
                    console.log('Please enter a department name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addRole',
            message: 'What is the role name?',
            when: (answers) => answers.options === 'Add a role',
            validate: addRoleInput => {
                if (addRoleInput) {
                    return true;
                } else {
                    console.log('Please enter a role name!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addSalary',
            message: `What is the role's salary?`,
            when: (answers) => answers.addRole,
            validate: (answer) => {
                if (isNaN(answer) || answer === '') {
                    return 'please enter a number!';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'addDepartmentId',
            message: 'What department does this role belong to?',
            when: (answers) => answers.addSalary,
            validate: addDepartmentIdInput => {
                if (addDepartmentIdInput) {
                    return true;
                } else {
                    console.log('What department does this role go with?');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'firstName',
            message: `What is the employee's first name?`,
            when: (answers) => answers.options === 'Add an employee',
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log('Please enter a first name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: `What is the employee's last name?`,
            when: (answers) => answers.firstName,
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log('Please enter a last name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newRole',
            message: `What is the employee's role?`,
            when: (answers) => answers.lastName,
            validate: newRoleInput => {
                if (newRoleInput) {
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager',
            message: `Who is the employee's manager (if any)?`,
            when: (answers) => answers.newRole
        }
    ])
};

promptUser();