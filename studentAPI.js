const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');

// Register

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: {
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
    }
})

router.post('/register', jsonParser, verifyRole, upload.single('profileimage'), function(req, res) {
    var cipher = crypto.createCipher(algo, key);
    var encrypted = cipher.update(req.body.password, 'utf-8', 'hex') +
        cipher.final('hex');
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        class: req.body.class,
        email: req.body.email,
        password: encrypted,
        contact: req.body.contact,
        profileimage: req.file.path
    })
    const { error } = userValidation(req.body);
    if (error) {
        res.send(error.details[0].message);
    } else {
        res.json({ message: "Data Successfully Saved!" });
        data.save().then((result) => {
            res.json(result)
        }).catch((error) => console.log(error))
    }
})

//login

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    //console.log(password , email)
    Student.findOne({$or: [{std_email:email}, {std_mobile:email}]})
    .then(student => {
        if(student){
            bcrypt.compare(password, student.std_password, function(err, result){
                //console.log(password)
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: student.std_firstname}, 'ScreTEs', {expiresIn:'1h'})
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
    bcrypt.hash(req.body.std_password, 10, (err, hashpass) => {
        if(err){
            res.json({
                error: err
            })
        }
    let StudentID = req.body.studentID

    let updateData = {
        std_name: req.body.std_name,
        std_email: req.body.std_email,
        std_password: hashpass,     
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

