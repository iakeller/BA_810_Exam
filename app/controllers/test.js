//loading the modules

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = mongoose.model('exam');

module.exports = function (app, config) {
    app.use('/api', router);

    //creating the post
 router.post('/document', function (req, res, next) {
        console.log('Create document', 'verbose');
        var user = new Test(req.body);
        user.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
           return next(err);
        });
      })
  //creating the get
router.get('/documents', function (req, res, next) {
        console.log('Get document', 'verbose');
        var query = Test.find()
          .sort(req.query.order)
          .exec()
          .then(result => {
               if(result && result.length) {
              res.status(200).json(result);
          } else {
              res.status(404).json({message: "No documents"});
          }
          })
          .catch(err => {
            return next(err);
          });
      })

                };
                  

