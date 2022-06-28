const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRouter = require('./routes/auth.router');
const employeeRouter = require('./routes/employee.router');
const languagesRouter = require('./routes/languages.router');
const jobRouter = require('./routes/job.router');



const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// listing to server
const app = express();


mongoose.connect("mongodb://localhost:27017/EmploymentMS")
  .then(() => {
    console.log("DB connected ....");

    // listen on port Number
    app.listen(process.env.PORT || 8080, () => {
      console.log(`listening to port 8080 `)
      //   //add admin if not exists
      //   InsertAdmin();
    });


  })
  .catch(error => {
    console.log(" DB Problem " + error)
  })


app.use(cors(corsOptions));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to see request body 
app.use((req, res, next) => {
  if (req.hasOwnProperty('body')) {
    console.log("request body object ", req.body);
  }
  if (req.hasOwnProperty('file')) {
    console.log("request file object ", req.file);
  }
  next();
});

// Routaing
app.use('/job', jobRouter);
app.use('/employee', employeeRouter);
app.use('/language', languagesRouter);
app.use('', authRouter);


//unknown paths
app.use((req, res, next) => {
  res.status(404).json({ message: " unknown url paths" });

});
//error
app.use((error, req, res, next) => {
  res.status(500).json({ error });

})
