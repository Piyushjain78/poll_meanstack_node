const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// for user signup
exports.user_Signup = function(req, res) {
    // conferms password
    if(req.body.password === req.body.confirm_password) {
        // checking if email aready exits or not in DB
        User.findOne({email:req.body.email}, function(err, item) {
            if(!item) {
                // hashing the password
                bcrypt.hash(req.body.password, 10, function(err, hash) {   
                    if(err) {
                        res.status(401).json({
                            "message" : "Something Went Wrong!.",
                            "success" : false,
                        });
                    } else {
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then(result => { 
                            let data = {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                user_id: result._id
                            };
                            jwt.sign(data, "zxbshui7yudflksuiofuosa5268asdadoQWER", {expiresIn: '1h'}, function(err, token) {  
                                res.status(201).json({
                                    "message" : "Your Account has been Created.",
                                    "success" : true,
                                    "response" : {
                                        token: token
                                    },
                                    "request" : {
                                        "type" : "POST",
                                        "url" : req.protocol + '://' + req.get('host') + req.originalUrl
                                    }
                                });
                            }); 
                        }).catch(error => {
                            res.status(401).json({
                                "success" : false,
                                "message" : "Something Went Wrong! Your Account not created",
                            });
                        });
                    }
                });
            } else {
                res.status(401).json({
                    "success" : false,
                    "message" : "Email already exists!",
                }); 
            }
        }).catch(error => {
            res.status(401).json({
                "success" : false,
                "message" : "Something Went Wrong! Your Account not created",
            });
        });
    } else {
        res.status(401).json({
            "success" : false,
            "message" : "Password is not matched with confirm password",
        });   
    }
};

// for user login
exports.user_Login = function(req, res) {
    // checking if user exist or not and checking its password also
    if(req.body.email && req.body.password) {
        User.findOne({email: req.body.email}, function(err, item) {
            if(err) {
                res.status(403).json({
                    "message" : "Please check the details!.",
                    "success" : false,
                });
            } else {
                if(item) {
                    // hashing the password
                    bcrypt.compare(req.body.password, item.password, function(err, result) {
                        if(result) {
                            try {
                                let data = {
                                    firstName: item.firstName,
                                    lastName: item.lastName,
                                    email: req.body.email,
                                    user_id: item._id
                                };
                                jwt.sign(data, "zxbshui7yudflksuiofuosa5268asdadoQWER", {expiresIn: '1h'}, function(err, token) {  
                                    res.status(200).json({
                                        "message" : "Hurray! You have logged In.",
                                        "success" : true,
                                        "response" : {
                                            token: token
                                        },
                                        "request" : {
                                            "type" : "POST",
                                            "url" : req.protocol + '://' + req.get('host') + req.originalUrl
                                        }
                                    });
                                }); 
                            } catch {
                                res.status(403).json({
                                    "success" : false,
                                    "message" : "Please check the details!.",
                                });
                            }
                        } else {
                            res.status(403).json({
                                "success" : false,
                                "message" : "Please check your Password!.",
                            });
                        }
                    });
                } else {
                    res.status(403).json({
                        "message" : "Please check the details!.",
                        "success" : false,
                    });
                }
            }
        });
    } else {
        res.status(403).json({
            "success" : false,
            "message" : "Please check the details!",
        });  
    }
};