const inquirer = require('inquirer');
const db = require('./db/connection')

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
            name: 'newRoleId',
            message: `What is the employee's role?`,
            when: (answers) => answers.lastName,
            validate: newRoleIdInput => {
                if (newRoleIdInput) {
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerId',
            message: `Who is the employee's manager (if any)?`,
            when: (answers) => answers.newRoleId
        },
        {
            type: 'input',
            name: 'EmployeeId',
            message: `What is the employee's id?`,
            when: (answers) => answers.options === 'Update an employee role'
        },
        {
            type: 'input',
            name: 'updateRoleId',
            message: `What is the updated role id?`,
            when: (answers) => answers.EmployeeId
        }
    ])
    .then((answers) => {
        // console.log(answers)
        if (answers.options === 'View all departments') {
            viewDept();
        }
        if (answers.options === 'View all roles') {
            viewRoles();
        }
        if (answers.options === 'View all employees') {
            viewEmployees();
        }
        if (answers.addDepartment) {
            const param = answers.addDepartment
            db.query(`INSERT INTO department (department_name) VALUES(?)`, param);
        }
        if (answers.addDepartmentId) {
            const param = [answers.addRole, answers.addSalary, answers.addDepartmentId];
            db.query(`INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`, param);
        }
        if (answers.managerId) {
            const param = [answers.firstName, answers.lastName, answers.newRoleId, answers.managerId];
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`, param);
        }
        if (answers.updateRoleId) {
            const param = [answers.updateRoleId, answers.EmployeeId];
            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, param);
        }
    })
};

function viewDept() {
    db.query(`SELECT * FROM department;`, (err, rows) => {
        console.table(rows)
    })
};

function viewRoles() {
    db.query(`SELECT role.id, role.title, department.department_name, role.salary 
    FROM role
    LEFT JOIN department ON role.department_id = department.id;`, (err, rows) => {
        console.table(rows)
    })
};

function viewEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS Manager              
    FROM employee
    LEFT JOIN role on employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    ORDER BY employee.id;`, (err, rows) => {
        console.table(rows)
    })
};

promptUser();