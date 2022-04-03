INSERT INTO department (department_name)
VALUES
    ('Legal'),
    ('Strategy'),
    ('Digital'),
    ('IT'),
    ('Executive');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Attorney', 80000.00, 1),
    ('Associate', 50000.00, 1),
    ('Product Analyst', 40000.00, 2),
    ('Senior Product Analyst', 70000.00, 2),
    ('Web Designer', 50000.00, 3),
    ('Lead Web Designer', 90000.00, 3),
    ('Software Specialist', 60000.00, 4),
    ('Senior Software Specialist', 80000.00, 4),
    ('CEO', 300000.00, 5),
    ('Chief Legal Officer', 150000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Poppy', 'Montgomery', 10, NULL),
    ('Martha', 'Stewart', 9, NULL),
    ('Alex', 'Roadhouse', 1, 1),
    ('Robert', 'Redford', 2, 3),
    ('Kimberly', 'Cranford', 2, 3),
    ('Mark', 'Curio', 4, 2),
    ('Haarken', 'Bridgewater', 3, 6),
    ('Trisha', 'Hardin', 3, 6),
    ('Heather', 'Allison', 6, 2),
    ('Rachel', 'Welsh', 5, 9),
    ('Ryan', 'Reynolds', 5, 9),
    ('Hugh', 'Jackman', 8, 2),
    ('Rebecca', 'Ferguson', 7, 12),
    ('Tom', 'Cruise', 7, 12);
