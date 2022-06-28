const mongoose = require("mongoose");
const userSchema = require("./user");


const Experience_Level_ENUM = require("./experienceLevel");
// const experienceLevelSchema = new mongoose.Schema({
//     text:{type:String , enum:Experience_Level_ENUM}
// },{_id: false});


const ProgrammingLanguagesSchema = new mongoose.Schema({
    name: { type: String, required: "Language name is required" },
});

const employeeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: "user id is required" },
    bio: { type: String, maxLength: 300 },
    languages: {
        type: [ProgrammingLanguagesSchema],
        unique: true
    },
    experienceLevel: { type: String, enum: Experience_Level_ENUM },

});
module.exports = mongoose.model("Employee", employeeSchema);

