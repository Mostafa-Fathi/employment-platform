const mongoose = require("mongoose");
const  userSchema= require("./user");
const ProgrammingLanguagesSchema = require("./programmingLanguages");
const ExperienceLevelSchema= require("./experienceLevel");



const employeeSchema = new Schema({
_id:{type: Schema.Types.ObjectId, ref: 'User',required :"user id is required"},
languages:[ProgrammingLanguagesSchema],
experienceLevel:ExperienceLevelSchema,
bio:{type:String,maxLength:300}
});
module.exports = mongoose.model("Employee", employeeSchema);
