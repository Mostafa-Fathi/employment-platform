const { validationResult } = require("express-validator");
const Employee = require("../Db/Models/employee");
const User = require("../Db/Models/user");




//get all employees
exports.getEmployees = async function (req, res, next) {
    const empData = await Employee.find({}, { __v: 0,password:0 });
    getDataForEmployeesById(empData).then((data) => {
        res.status(200).json(data);
    })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })

}
async function getDataForEmployeesById(empData) {
    let respones = [];
    let i = 0;
    for (const element of JSON.parse(JSON.stringify(empData))) {
        respones.push(element);
        console.log(respones);

        const userData = await User.findById(element._id,{ __v: 0,password:0 });

        for (const property in JSON.parse(JSON.stringify(userData))) {
            respones[i][property] = userData[property];
        }
        i++;
    }
    return respones;
}

//get Employee by id
exports.getEmployeeById = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    const { _id } = req.body;
    const empData = await Employee.find({"_id":_id}, { __v: 0 });
    getDataForEmployeesById(empData).then(data => {
        res.status(200).json(data)
    })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//update employee
exports.updateEmployee = (req, res, next) => {
    const { name, gender, address, email, birth_date, mobile, password, type, bio, languages, experienceLevel ,_id} = req.body;
    let birthDate = new Date(birth_date);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    User.findByIdAndUpdate(_id, {
        $set: {
            name, gender, address, email, mobile, password, type, birth_date: birthDate
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("User not Found!")
            } else {

                Employee.findByIdAndUpdate(_id, {
                    $set: {
                        bio, languages, experienceLevel
                    }
                }).then(empData => {
                    if (empData == null) {
                        throw new Error("Employee not Found!")
                    }
                    else {
                        res.status(200).json({ message: "updated" })
                    }
                }).catch(error => {
                    error.status = 500;
                    next(error.message);
                })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete Employee
exports.deleteEmployee = (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Employee.findByIdAndDelete(_id)
        .then((data) => {
            if (data == null) {
                throw new Error("Employee not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}