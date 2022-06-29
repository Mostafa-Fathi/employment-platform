const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getApplications,getApplicationsByJobId,getAnApplication,addApplication,updateApplication,deleteApplication} = require("../controllers/application.controller")
const Experience_Level_ENUM=  require("../Db/Models/experienceLevel");
const authController = require('./../controllers/auth.controller');


//get applications
router.get("", authController.protect , authController.restrictTo('Employer'), getApplications);


//get apps by a job id
router.post("/job", authController.protect , authController.restrictTo('Employer'),[
     body("job").isString().withMessage("Job ID is Not Correct"),
   
], getApplicationsByJobId);

// get application by id
router.post("/one", authController.protect , authController.restrictTo('Employer','Employee'), [
     body("_id").isString().withMessage("Application ID is Not Correct"),
   
], getAnApplication);

//add new application
router.post("",authController.protect , authController.restrictTo('Employee'), [
    body("applier").isString().withMessage("applier ID is Not Correct"),
    body("job").isString().withMessage("job ID is Not Correct"),
], addApplication);

//update job
router.put("", authController.protect , authController.restrictTo('Employer','Employee'),[
    body("applier").isString().withMessage("applier ID is Not Correct"),
    body("job").isString().withMessage("job ID is Not Correct"),
    body("status").isArray().withMessage("Stauts object is reqiured"),  
],updateApplication);

router.delete("", authController.protect , authController.restrictTo( 'empolyee'), deleteApplication);
module.exports = router;