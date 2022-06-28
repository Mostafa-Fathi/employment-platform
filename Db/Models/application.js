const mongoose = require("mongoose");
const statusSchema = require("./applicationStauts")

const applicationSchema = new mongoose.Schema({
    applier: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    status: {
        type: [statusSchema],
        validate: function arrayLimit(val) {
            return val.length <= 5;
        }
        , default: { text: 'Submitted', created_at: Date.now }
    }
});

module.exports = mongoose.model("Application", applicationSchema);
