const mongoose = require("mongoose");
const employerSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'User', required: "user id is required" },
});
module.exports = mongoose.model("Employer", employerSchema);