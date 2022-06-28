const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getLanguages,getALanguage,addlanguage,updatelanguage,deletelanguage} = require("../controllers/languages.controller")


//get all Clinic Services
router.get("", getLanguages);


//get a Clinic Service data
router.post("/one",[
     body("_id").isString().withMessage("Language ID is Not Correct"),
   
], getALanguage);

//add new Clinic Service route
router.post("", [
    body("name").isString().withMessage("Language Name should be String"),
   
], addlanguage);

//update Clinic Service route
router.put("", [
    body("name").isString().withMessage("Language Name should be String"),
  
],updatelanguage);

router.delete("", deletelanguage);
module.exports = router;