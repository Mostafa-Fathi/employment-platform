const mongoose = require("mongoose");
const employerSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: "user id is required" },
});
module.exports = mongoose.model("Employer", employerSchema);