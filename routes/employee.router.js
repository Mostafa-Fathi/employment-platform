const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const Experience_Level_ENUM=  require("../Db/Models/experienceLevel");

const { getEmployeeById, getEmployees, updateEmployee, deleteEmployee } = require("../controllers/employee.controller")


//get all employees
router.get("", [], getEmployees);


//signup
router.post("/one", [
    body("_id").isString().withMessage("Employee id is required"),
], getEmployeeById)

//update Employee route
router.put("", [
    body("name.firstname").isString().withMessage("Employee First Name should be String"),
    body("address").isString().withMessage("Employee address should be String"),
    body("name.lastname").isString().withMessage("Employee Last Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['M', 'F']).withMessage("Employee Name should be String"),
    body("type").isIn(['Employee', 'Employer']).withMessage("User Must have a type"),
    body("mobile").isNumeric().matches(/^01[0-2,5]{1}[0-9]{8}$/).withMessage("wrong phone number"),
    body("password").isString().withMessage("password shouldn't be empty"),
    body("birth_date").isDate().withMessage("birthdate is reqiured"),
    body("bio").isString().withMessage("Bio is reqiured"),
    body("experienceLevel").isIn(Experience_Level_ENUM).withMessage("experience Level is reqiured"),
    body("languages").isArray().withMessage("languages Array is reqiured"),
], updateEmployee);

router.delete("", deleteEmployee);

module.exports = router;