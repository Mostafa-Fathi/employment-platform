const { validationResult } = require("express-validator");
const ProgrammingLanguages = require("../Db/Models/programmingLanguages");

//get all languages
exports.getLanguages = (req, res, next) => {
    ProgrammingLanguages.find({},{__v:0})
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific language
exports.getALanguage = (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    ProgrammingLanguages.findById(_id,{__v:0})
        .then(data => {
            if (data == null) {
                throw new Error("Language not Found!")
            } else {
                res.status(200).json( data)
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new language
exports.addlanguage = (req, res, next) => {
    const { name } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let programmingLanguage = new ProgrammingLanguages({
        name
    });
    programmingLanguage.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })

}
//update language
exports.updatelanguage = (req, res, next) => {
    const { _id, name } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    ProgrammingLanguages.findByIdAndUpdate(_id, {
        $set: {
            name
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("programming Language not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete language
exports.deletelanguage = (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    ProgrammingLanguages.findByIdAndDelete(_id)
        .then((data) => {
            if (data == null) {
                throw new Error("programming Language not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}