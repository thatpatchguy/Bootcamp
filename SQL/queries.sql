--List the following details of each employee: employee number, last name, first name, sex, and salary.
SELECT employees.emp_no, employees.first_name, employees.last_name, employees.sex, salaries.salary
FROM employees
JOIN salaries ON employees.emp_no = salaries.emp_no;

--List first name, last name, and hire date for employees who were hired in 1986.
SELECT first_name, last_name,
	hire_date
FROM employees
WHERE hire_date LIKE '%1986';

--List the manager of each department with the following information:
--department number, department name, the manager's employee number, last name, first name.
SELECT dept.dept_no, dept.dept_name, emp.first_name,
	emp.last_name, emp.emp_no
FROM departments AS dept
JOIN dept_manager ON dept.dept_no = dept_manager.dept_no
JOIN employees AS emp ON dept_manager.emp_no = emp.emp_no;

--List the department of each employee with the following information: employee number, last name, first name, and department name.
SELECT emp.first_name, emp.last_name, emp.emp_no, dept.dept_name
FROM employees AS emp
JOIN dept_emp ON emp.emp_no = dept_emp.emp_no
JOIN departments AS dept ON dept_emp.dept_no = dept.dept_no;

--List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
SELECT first_name, last_name, sex
FROM employees
WHERE first_name = 'Hercules'
AND last_name LIKE 'B%';

--List all employees in the Sales department, including their employee number, last name, first name, and department name.
SELECT emp.emp_no, emp.first_name, emp.last_name, dept.dept_name
FROM employees AS emp
JOIN dept_emp ON emp.emp_no = dept_emp.emp_no
JOIN departments AS dept ON dept_emp.dept_no = dept.dept_no
WHERE dept.dept_name = 'Sales';

--List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
SELECT emp.emp_no, emp.first_name, emp.last_name, dept.dept_name
FROM employees AS emp
JOIN dept_emp ON emp.emp_no = dept_emp.emp_no
JOIN departments AS dept ON dept_emp.dept_no = dept.dept_no
WHERE dept.dept_name IN ('Sales','Development');

--In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT last_name, count(*)
FROM employees
GROUP BY last_name
ORDER BY count(*) DESC;

--Epilogue
SELECT * FROM salaries WHERE emp_no = 499942;