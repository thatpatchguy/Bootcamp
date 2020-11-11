CREATE TABLE departments(
dept_no VARCHAR PRIMARY KEY,
dept_name VARCHAR);

CREATE TABLE dept_emp(
emp_no INT,
FOREIGN KEY(emp_no) REFERENCES employees(emp_no),
dept_no VARCHAR,
FOREIGN KEY(dept_no) REFERENCES departments(dept_no));


CREATE TABLE dept_manager(
dept_no VARCHAR,
FOREIGN KEY(dept_no) REFERENCES departments(dept_no),
emp_no INT,
FOREIGN KEY (emp_no) REFERENCES employees(emp_no));

CREATE TABLE titles(
title_id VARCHAR PRIMARY KEY NOT NULL,
title VARCHAR);


CREATE TABLE employees(
emp_no INT PRIMARY KEY,
emp_title VARCHAR NOT NULL,
FOREIGN KEY(emp_title) REFERENCES titles(title_id),
birthdate VARCHAR,
first_name VARCHAR NOT NULL,
last_name VARCHAR NOT NULL,
sex VARCHAR(1) NOT NULL,
hire_date VARCHAR NOT NULL);

CREATE TABLE salaries(
emp_no INT,
FOREIGN KEY(emp_no) REFERENCES employees(emp_no),
salary INT);