const Poll = require('../models/poll');
const Vote = require('../models/vote');

exports.add_Vote = (req, res, next) => {
    const vote = new Vote({
        userId: req.body.user_id,
        pollId: req.body.poll_id, 
        option: req.body.option
    });
    
    // update the poll and vote 
    Poll.findById(req.body.poll_id, function (err, item) {
        if (err){ 
            res.status(201).json({
                "message" : "Poll not Updated",
                "success" : false
            });
        } 
        else{ 
            id = req.body.option;
            option = "option_"+id;
            item.optionsResult[option] = item.optionsResult[option] + 1;
            item.optionsResultTotal = item.optionsResultTotal + 1;
            // updates the poll item
            item.save(error => {
                if(error) {
                    res.status('404').json({
                        "success" : false,
                        "message" : "Vote not added! ERROR => "+error
                    });
                }
            });
            // updates the vote
            if(item.optionsResult[option]) {
                vote.save().then(result => {
                    res.status(201).json({
                        "message" : "Vote has been added",
                        "success" : true,
                        "response" : result
                    });
                }).catch(error =>  {
                    res.status('404').json({
                        "success" : false,
                        "message" : "Vote not added! ERROR => "+error
                    });
                });
            } else {
                res.status('404').json({
                    "success" : false,
                    "message" : "Vote not added!"
                });
            }
        }
    });
};
