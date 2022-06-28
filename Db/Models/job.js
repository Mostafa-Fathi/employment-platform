const mongoose = require("mongoose");
const Experience_Level_ENUM = require("./experienceLevel");

const jobStatusSchema = new mongoose.Schema({
    text: { type: String, default: 'Opened', enum: ['Opened', 'Closed'] },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { _id: false });
const ProgrammingLanguagesSchema = new mongoose.Schema({
    name: { type: String, required: "Language name is required" },
});


const jobSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
    description: { type: String, maxLength: 300 },
    requireExperienceLevel: { type: String, enum: Experience_Level_ENUM },
    status: {
        type: [jobStatusSchema],
        validate: function arrayLimit(val) {
            return val.length <= 2;
        }
        , default: { text: 'Opened', created_at: Date.now() }
    },
    requireLanguages: {
        type: [ProgrammingLanguagesSchema],
        unique: true
    }
});

module.exports = mongoose.model("Job", jobSchema);
