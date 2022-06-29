const mongoose = require("mongoose");
const {Application_Stauts_ENUM} =  require("./applicationStauts");
const statusSchema = new mongoose.Schema({
    text: { type: String, enum: Application_Stauts_ENUM, unique: true },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { _id: false });


const applicationSchema = new mongoose.Schema({
    applier: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    status: {
        type: [statusSchema],
        validate: function arrayLimit(val) {
            return val.length <= 5;
        }
        , default: { text: 'Submitted', created_at: Date.now() }
    }
});

module.exports = mongoose.model("Application", applicationSchema);
