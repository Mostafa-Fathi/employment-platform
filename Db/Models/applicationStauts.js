const mongoose = require("mongoose");

const Application_Stauts_ENUM = ['Submitted', 'Viwed','Accepted','Rejected','Shortlisted'];
const experienceLevelSchema = new mongoose.Schema({
    text: { type: String, enum: Application_Stauts_ENUM, unique: true },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { _id: false });
module.exports = mongoose.model("ExperienceLevel", experienceLevelSchema);
module.exports.Application_Stauts_ENUM = Application_Stauts_ENUM;
