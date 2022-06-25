const mongoose = require("mongoose");
const ProgrammingLanguagesSchema = require("./programmingLanguages");
const ExperienceLevelSchema = require("./experienceLevel");

const jobStatusSchema = new Schema({
    text: { type: String, default: 'Opened', enum: ['Opened', 'Closed'] },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const jobSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'Employer' },
    description: { type: String, maxLength: 300 },
    requireExperienceLevel: ExperienceLevelSchema,
    status: {
        type: [jobStatusSchema],
        validate: function arrayLimit(val) {
            return val.length <= 2;
        }
        , default: { text: 'Opened', created_at: Date.now }
    },
    requireLanguages: {
        type: [ProgrammingLanguagesSchema],
        unique: true
    }
});

module.exports = mongoose.model("Job", jobSchema);
