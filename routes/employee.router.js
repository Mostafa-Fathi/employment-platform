const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const Experience_Level_ENUM = require("../Db/Models/experienceLevel");

const { getEmployeeById, getEmployees, updateEmployee, deleteEmployee } = require("../controllers/employee.controller")
const { getApplicationsByApplierId } = require("../controllers/application.controller")
const {protect,restrictTo} = require('./../controllers/auth.controller');


//get all employees
router.get("", protect,
    getEmployees);


//get an employee 
router.post("/one", protect, [
    body("_id").isString().withMessage("Employee id is required"),
], getEmployeeById)

//get an employee`s applications
router.post("/myapplications", protect, restrictTo('Employee'), [
    body("applier").isString().withMessage("Employee id is required"),
], getApplicationsByApplierId)

//update Employee 
router.put("", protect, restrictTo('Employee'), [
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

router.delete("", protect , restrictTo('Employee','admin'),deleteEmployee);

module.exports = router;