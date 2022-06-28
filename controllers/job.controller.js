const { validationResult } = require("express-validator");
const Job = require("../Db/Models/job");
const User = require("../Db/Models/user");


async function getJobOwnerDataById(jobData) {
    let respones = [];
    let i = 0;
    for (const element of JSON.parse(JSON.stringify(jobData))) {
        respones.push(element);

        const userData = await User.findById(element.owner,{ __v: 0,password:0 });

        respones[i].owner = userData;
        // for (const property in JSON.parse(JSON.stringify(userData))) {
        //     respones[i][property] = userData[property];
        // }
        i++;
    }
    return respones;
}

//get all jobs
exports.getJobs = async (req, res, next) => {
    jobsData = await Job.find({}, { __v: 0 });
    getJobOwnerDataById(jobsData)
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get jobs by owner id
exports.getJobsByOwnerId =async  (req, res, next) => {
    const { owner } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    jobsData = await Job.find({"owner":owner}, { __v: 0 });
    getJobOwnerDataById(jobsData)
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific job
exports.getAJob =async (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    jobsData = await Job.findById({_id}, { __v: 0 });
    getJobOwnerDataById(jobsData)
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new Job
exports.addJob = (req, res, next) => {
    const { owner,description,requireExperienceLevel,requireLanguages } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let job = new Job({
        owner,description,requireExperienceLevel,requireLanguages
    });
    job.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })

}
//update Job
exports.updateJob = (req, res, next) => {
    const { _id, owner,description,requireExperienceLevel,requireLanguages ,status } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Job.findByIdAndUpdate(_id, {
        $set: {
            owner,description,requireExperienceLevel,requireLanguages ,status 
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("Job not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete job
exports.deleteJob= (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Job.findByIdAndDelete(_id)
        .then((data) => {
            if (data == null) {
                throw new Error("Job not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}