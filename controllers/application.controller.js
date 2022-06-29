const { validationResult } = require("express-validator");
const Job = require("../Db/Models/job");
const User = require("../Db/Models/user");
const Application = require("../Db/Models/application");


async function getApplicationDataById(appData) {
    let respones = [];
    let i = 0;
    for (const element of JSON.parse(JSON.stringify(appData))) {
        respones.push(element);

        const userData = await User.findById(element.applier,{ __v: 0,password:0 });
        const jobData = await Job.findById(element.job,{ __v: 0 });
        const empData = await User.findById(element.applier,{ __v: 0});

        respones[i].applier = userData;
        respones[i].job = jobData;
        respones[i].applier.languages=empData.languages;
        respones[i].applier.experienceLevel=empData.experienceLevel;
        respones[i].applier.bio=empData.bio;
        i++;
    }
    return respones;
}

//get all applications
exports.getApplications = async (req, res, next) => {
    ApplicationData = await Application.find({}, { __v: 0 });
    getApplicationDataById(ApplicationData)
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get applications by job id
exports.getApplicationsByJobId =async  (req, res, next) => {
    const { job } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    appsData = await Application.find({"job":job}, { __v: 0 });
    getApplicationDataById(appsData)
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get applications by applier id
exports.getApplicationsByApplierId =async  (req, res, next) => {
    const { applier } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    appsData = await Application.find({"applier":applier}, { __v: 0 });
    getApplicationDataById(appsData)
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific job
exports.getAnApplication =async (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    appsData = await Application.findById({_id}, { __v: 0 });
    getApplicationDataById(appsData)
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new Application
exports.addApplication = (req, res, next) => {
    const {applier,job } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let app = new Application({
        applier,job
    });
    app.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })

}
//update Job
exports.updateApplication = (req, res, next) => {
    const { applier,job,status,_id} = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Application.findByIdAndUpdate(_id, {
        $set: {
            applier,job,status
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("Application not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete Application
exports.deleteApplication= (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Application.findByIdAndDelete(_id)
        .then((data) => {
            if (data == null) {
                throw new Error("Application not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}