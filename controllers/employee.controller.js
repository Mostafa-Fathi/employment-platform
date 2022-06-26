const { validationResult } = require("express-validator");
const Employee = require("../Db/Models/employee");




//get all employees
exports.getEmployees = (req, res, next) => {
    Employee.find({}, { __v: 0 })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get Employee by id
exports.getEmployeeById = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    const { _id } = req.body;
    Employee.find({ '_id': _id }, { __v: 0 })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

