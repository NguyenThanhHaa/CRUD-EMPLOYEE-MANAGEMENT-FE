import axios from "axios";

const employeesList = process.env.EMPLOYEES_LIST;

export const listEmployees = () => {
    return axios.get(employeesList);
}

const addEmployee = process.env.ADD_EMPLOYEE;

export const addNewEmployee = (employee) =>{
     axios.post(addEmployee,employee);
}
