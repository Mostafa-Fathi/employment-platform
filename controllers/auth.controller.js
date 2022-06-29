const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const {promisify} = require('promisify');
const Employee = require("../Db/Models/employee");
const User = require("../Db/Models/user");
const Employer = require("../Db/Models/employer");
const AppError = require('./../utils/app_error');
const catchAsync = require('./../utils/catchAync');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, stausCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
    ),
    // secure: true,
    httpOnly: true,
  };


  res.cookie('JWT', token, cookieOptions);


  user.password = undefined;
  res.status(stausCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
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
                    createSendToken(employer, 201, res);

                })
            }
            else {
                let employer = new Employer({ _id: data._id, })
                employer.save().then(empData => {
                    createSendToken(employer, 201, res);
                    
                })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        });


});




exports.login = catchAsync(async (req, res, next) => {
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
            createSendToken(user._id, 200, res);
                
            }

            else {
                res.status(400).json({ error: "Invalid Credentials" });
            }
        }).catch(error => {
            error.status = 500;
            next(error.message);
        });
});


exports.protect = async (req, res, next) => {
    // 1) getting teh token and check if it exists
    let token;

  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
    }
  
    if (!token) {
      return next(
        new AppError('You need to be logged in to see this content', 401)
      );
    }
    // else {
    //   console.log('hhhhhhhhhhhhhhhh', token);
    // }
  
    // 2) verification of  the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // 3) check if the user still exists
  
    const freshUser = await User.findById(decoded.id);
    console.log(
      'jjjjjjjjjjjjj ',
      decoded,
      freshUser // req.headers.authorization.startsWith('Bearer')
    );
    if (!freshUser) {
      return next(
        new AppError('The user of this token does no longer exist', 401)
      );
    }
    // 4) check if the user changed the paswword after the jst was issued
    //only now grant access
    req.user = freshUser;
    
    console.log(req.user);
    next();
  }
  
  exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.type)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      next();
    };
  };