var express = require('express');
var router = express.Router();
var Album = require('../models/album');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Albums database'});
});

router.get('/viewalbum/:id', function (req, res, next) {
    Album.findOne({_id: req.params.id})
        .then(function (album) {
            res.render('viewalbum', {
                album: album,
                headTitle: 'View album:'
            });
        })
});

//Get list of all albums from the database
router.get('/albums', function (req, res, next) {
    var count = 1;

    Album.find({})
        .then(function (albums) {
            res.render('albums', {
                albums: albums,
                title: 'Albums database',
                count: count
            });
        });
});

// Add new album to database
router.get('/addalbum', function (req, res, next) {
    res.render('addalbum', {
        headTitle: 'Adding a new album'
    });
});

// Display update form
router.get('/updatealbum/:id', function (req, res, next) {
    Album.findOne({_id: req.params.id})
        .then(function (album) {
            res.render('updatealbum', {
                album: album,
                headTitle: 'Update album:'
            });
        })
});


// Add new album to database
router.post('/postalbum', function (req, res, next) {

    Album.create(req.body)
        .then(function (album) {
            res.redirect('/albums')
        })
});



// delete album from the database
router.post('/delete/:id', function (req, res, next) {


    Album.findByIdAndRemove({_id: req.params.id})
        .then(function (album) {
            res.redirect('/albums')
        });
});

//update and album in the database
router.post('/update/:id', function (req, res, next) {

    console.log('Updating..')



    Album.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(function (album) {
            res.redirect('/albums')
        });
});

module.exports = router;



