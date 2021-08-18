const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

// Register

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    email: {
        type: Email,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    profPic: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true                       
            }
        }
    ]

})


//login

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    //console.log(password , email)
    Student.findOne({$or: [{email:email}, {mobile:email}]})
    .then(student => {
        if(student){
            bcrypt.compare(password, student.password, function(err, result){
                //console.log(password)
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: student.firstname}, 'ScreTEs', {expiresIn:'1h'})
                    res.json({
                        message: msg.login,
                        token: token
                    })
                }else{
                    res.json({
                        message: msg.loginError
                    })
                }
            })
        }
        else{
            res.json({
                message: msg.studentnotFound
            })
        }
    })
}

// update

const updateStudent = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashpass) => {
        if(err){
            res.json({
                error: err
            })
        }
    let StudentID = req.body.studentID

    let updateData = {
        name: req.body.name,
        email: req.body.email,
        password: hashpass,     
    }

    Student.findOneAndUpdate(StudentID, {$set: updateData})
    .then(() => {
        res.json({
            message: msg.updateData
        })
    })
    .catch(error => {
        res.json({
            message: msg.updateDataError
        })
    })
}
)}

// delete
const deleteStudent = (req, res, next) =>{
    let StudentID = req.params.id

        Student.findByIdAndRemove(StudentID)
        .then(() => {
            res.json({
                message: msg.deletestudent
            })
        })
        .catch(error => {
            res.json({
                message:  msg.deletestudentError
            })
        })    
    }

// node mailer

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "mrudulwebclues@outlook.com",
        pass: "TryHarder"
    }
});

const options ={
    from: "mrudulwebclues@outlook.com",
    to: email,
    subject: "Welcome to the School",
    text: "Hello Student, Welcome to our School!"
};

transporter.sendMail(options, function (err, info){
    if (err){
        console.log(err);
        return;
    }
    console.log("Sent: " + info.response);
})