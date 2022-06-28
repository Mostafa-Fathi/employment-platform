const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller")


//login
router.post("/login", [
    body("email").isEmail().withMessage("email format not correct"),
    body("password").isString().withMessage("password shouldn't be empty"),
], login)


//signup
router.post("/signup", [
    body("name.firstname").isString().withMessage("Employee First Name should be String"),
    body("address").isString().withMessage("Employee address should be String"),
    body("name.lastname").isString().withMessage("Employee Last Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['M', 'F']).withMessage("Employee Name should be String"),
    body("type").isIn(['Employee', 'Employer']).withMessage("User Must have a type"),
    body("mobile").isNumeric().matches(/^01[0-2,5]{1}[0-9]{8}$/).withMessage("wrong phone number"),
    body("password").isString().withMessage("password shouldn't be empty"),
    body("birth_date").isDate().withMessage("birthdate is reqiured"),
], signup)


module.exports = router;