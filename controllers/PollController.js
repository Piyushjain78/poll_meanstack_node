const express = require('express');
const mongoose = require("mongoose")
const Poll = require('../models/poll');

exports.get_Polls = async function(req, res, next) {
    let filter = JSON.parse(req.query.filter);

    const pageOptions = {
        page: parseInt(filter.pageIndex) || 0,
        limit: parseInt(filter.pageSize) || 5
    }
    const all_polls_count = await Poll.count();
    
    Poll.find({
        // filtering using expiry
        expiry: {
            $gte: new Date() 
        }
    }, function(err, polls) {
        if(!err && polls.length > 0) {
            res.status(200).json({
                "message" : "Get all poll",
                "success" : true,
                "response" : polls,
                "all_polls_count" : all_polls_count
            });
        } else {
            res.status(200).json({
                "message" : "No poll",
                "success" : false,
            }); 
        }
    })
    .limit(pageOptions.limit)
    .skip(pageOptions.page * pageOptions.limit)
    .catch(error => {
        console.log(error);
        res.status(500).json({
            "success" : false,
            "message" : "Unable to get Polls! ERROR => "+error
        });
    });
};

exports.create_Poll = (req, res, next) => {
    let optionsResult = {"option_1":0,"option_2":0,"option_3":0,"option_4":0,"option_5":"0"};
    const poll = new Poll({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        userName: req.body.userName,
        start: req.body.start,
        expiry: req.body.expiry,
        options: req.body.options,
        optionsResult: optionsResult,
        user_id: req.body.user_id
    });
    poll.save().then(result => {
        res.status(201).json({
            "message" : "poll has been created",
            "success" : true,
            "response" : result,
            "request" : {
                "type" : "POST",
                "url" : req.protocol + '://' + req.get('host') + req.originalUrl
            }
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            "success" : false,
            "message" : "poll not created! ERROR => "+error,
        });
    });
};

exports.get_Item = (req, res, next) => {
    Poll.findOne({_id:req.params.poll_id, expiry:{
        $gte: new Date() 
    }}, function(err, poll) {
        if(!err) {
            res.status(200).json({
                "message" : "poll Item",
                "success" : true,
                'response' : poll
            });
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
            "message" : "Unable to get Item! ERROR => "+error
        });
    });
};

exports.update_Poll = (req, res, next) => {
    console.log(req.params);
    Poll.updateOne({_id:req.params.poll_id}, req.body, function (err, item) { 
        if (err || item.n == 0){ 
            res.status(204).json({
                "message" : "poll not Updated",
                "success" : false
            });
        } 
        else{ 
            res.status(200).json({
                "message" : "poll updated successfully",
                "success" : true,
                'response' : req.body
            });
        } 
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            "success" : false,
            "message" : "Unable to update Item! ERROR => "+error
        });
    });
};

exports.delete_Poll = (req, res, next) => {
    Poll.deleteOne({_id: req.params.poll_id}, function(err, item){
        console.log("item =======", item)
        if(!err) {
            res.status(200).json({
                "message" : "poll deleted sucessfully",
                'success' : true
            });
        } else {
            console.log(err);
            res.status(403).json({
                "message" : "poll not deleted",
                'success' : false
            }); 
        }
    }).catch(error => {
        res.status(500).json({
            "message": "Something Went Wrong!",
            "success" : false
        });
    });
};

