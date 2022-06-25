const mongoose = require("mongoose");

const Experience_Level_ENUM=  ['Fresh','Junior','Mid-Level','Senior','Team Leader'];
const experienceLevelSchema = new Schema({
    Text:{type:String , enum:Experience_Level_ENUM,unique: true}
},{_id: false});
module.exports = mongoose.model("ExperienceLevel", experienceLevelSchema);
module.exports.Experience_Level_ENUM=Experience_Level_ENUM;
