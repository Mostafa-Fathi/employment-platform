const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getJobs,getAJob,addJob,updateJob,deleteJob} = require("../controllers/job.controller")
const Experience_Level_ENUM=  require("../Db/Models/experienceLevel");


//get jobs
router.get("", getJobs);


//get a job data
router.post("/one",[
     body("_id").isString().withMessage("Job ID is Not Correct"),
   
], getAJob);

//add new job
router.post("", [
    body("owner").isString().withMessage("owner ID is Not Correct"),
    body("description").isString().withMessage("description is Not Correct"),
    body("requireExperienceLevel").isIn(Experience_Level_ENUM).withMessage("experience Level is reqiured"),
    body("requireLanguages").isArray().withMessage("languages Array is reqiured"),   
], addJob);

//update job
router.put("", [
    body("owner").isString().withMessage("owner ID is Not Correct"),
    body("description").isString().withMessage("description is Not Correct"),
    body("requireExperienceLevel").isIn(Experience_Level_ENUM).withMessage("experience Level is reqiured"),
    body("requireLanguages").isArray().withMessage("languages Array is reqiured"),  
    body("status").isArray().withMessage("Stauts object is reqiured"),  
],updateJob);

router.delete("", deleteJob);
module.exports = router;