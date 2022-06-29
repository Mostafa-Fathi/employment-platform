const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const { getLanguages, getALanguage, addlanguage, updatelanguage, deletelanguage } = require("../controllers/languages.controller")
const authController = require('./../controllers/auth.controller');


//get all languages
router.get("", authController.protect, getLanguages);


//get a language
router.post("/one", authController.protect, authController.restrictTo('admin'), [
    body("_id").isString().withMessage("Language ID is Not Correct"),

], getALanguage);

//add new language
router.post("", authController.protect, authController.restrictTo('admin'), [
    body("name").isString().withMessage("Language Name should be String"),

], addlanguage);

//update language
router.put("", authController.protect, authController.restrictTo('admin'), [
    body("name").isString().withMessage("Language Name should be String"),

], updatelanguage);

router.delete("", authController.protect, authController.restrictTo('admin'),
    deletelanguage);
module.exports = router;