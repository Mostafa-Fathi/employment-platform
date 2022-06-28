const { validationResult } = require("express-validator");
const Employee = require("../Db/Models/employee");
const User = require("../Db/Models/user");
const Employer = require("../Db/Models/employer");
exports.login = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    const { email, password } = req.body;

    User.findOne({ email: email }, { __v: 0 }).
        then((user) => {
            if (user.password == password) {
                if (user.type == 'Employee') {
                    Employee.findOne({ _id: user._id }, { __v: 0 }).
                        then((emp) => {
                            let resData = user;
                            resData.languages = emp.languages;
                            resData.experienceLevel = emp.experienceLevel;
                            resData.bio = emp.bio;
                            res.status(200).json({ resData });
                        });
                }
                else {
                    res.status(200).json({ user });
                }
            }

            else {
                res.status(400).json({ error: "Invalid Credentials" });
            }
        }).catch(error => {
            error.status = 500;
            next(error.message);
        });
}

exports.signup = (req, res, next) => {
    let errors = validationResult(req);
    const { name, gender, address, email, birth_date, mobile, password, type } = req.body;
    console.log(name);
    let birthDate = new Date(birth_date);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        console.log("eeee");

        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    else {console.log("usergdender");}

    let user = new User({
        name, gender, address, email, birth_date:birthDate, mobile, password, type
    });
    console.log( user.gender);
    user.save()
        .then(data => {
            if (type == 'Employee') {
                let employee = new Employee({ _id: data._id, })
                employee.save().then(empData => {
                    res.status(201).json({ id: data._id });
                })
            }
            else {
                let employer = new Employer({ _id: data._id, })
                employer.save().then(empData => {
                    res.status(201).json({ id: data._id });
                })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        });


}