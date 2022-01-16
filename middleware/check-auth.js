const jwt = require('jsonwebtoken');
const Poll = require('../models/poll');

// verify jwt token
exports.jwt_verify = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'zxbshui7yudflksuiofuosa5268asdadoQWER');
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({
            "message" : "Authentication Failed!",
            "success" : false
        });
    }
};


// check user autorization
exports.user_authorization = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt_decode = jwt.decode(token, 'zxbshui7yudflksuiofuosa5268asdadoQWER');
        Poll.findOne({_id:req.params.poll_id}, function(err, poll) {
            if(!err) {
                console.log(poll);
                if(poll.user_id == jwt_decode.user_id) {
                    next();
                } else {
                    res.status(404).json({
                        "message" : "You are not authorized to do this.",
                        "success" : false,
                    });
                }
            } else {
                res.status(404).json({
                    "message" : "No Poll Item Found",
                    "success" : false,
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                "success" : false,
                "message" : "Unable to get Item! ERROR"
            });
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({
            "message" : "You are not authorized to do this!",
            "success" : false
        });
    }
};