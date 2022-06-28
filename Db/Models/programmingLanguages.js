const { mongoose } = require("mongoose");

const ProgrammingLanguagesSchema = new mongoose.Schema({
    name: {type: String,required:"Language name is required"},
});
module.exports = mongoose.model("ProgrammingLanguages", ProgrammingLanguagesSchema);
