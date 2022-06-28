const mongoose = require("mongoose");

const name = new mongoose.Schema({
    firstname: { type: String, trim: true, required: "First name is required" },
    lastname: { type: String, trim: true, required: "last name is required" },
}, { _id: false });
const GENDER_ENUM = ['M', 'F'];
const USER_TYPE_ENUM = ['Employee', 'Employer'];

const userSchema = new mongoose.Schema({
    name: { type: name, required: "Name is Rquired" },
    token: { type: String, trim: true },
    gender: { type: String, enum: GENDER_ENUM, required: "gender is required" },
    address: { type: String },
    birth_date: {
        type: Date, required: true,
        // validate: {
        //     validator: function (v) {
        //         const d = new Date();
        //         let year = d.getFullYear();
        //         return (
        //             v && // check that there is a date object
        //             year - v.getFullYear() > 16
        //         );
        //     },
        //     message:
        //         "User Must be at least 16 years old ",
        // }
    },
    fcm_token: { type: String },
    mobile: { type: String, trim: true, unique: true },
    password: { type: String, required: "password is required" },
    email: { type: String, required: "email is required", unique: true },
    type: { type: String, enum: USER_TYPE_ENUM, required: "type is required" },
});
module.exports = mongoose.model("User", userSchema);
