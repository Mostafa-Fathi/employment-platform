const { mongoose } = require("mongoose");

const ProgrammingLanguagesSchema = new Schema({
    name: {type: String,required:"Language name is required",unique: true},
}, {_id: false});
module.exports = mongoose.model("ProgrammingLanguages", ProgrammingLanguagesSchema);
