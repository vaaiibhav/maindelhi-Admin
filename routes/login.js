var express = require('express');
// var knex = require('knex');
var router = express.Router();
const knex = require('../knex_files');
var cookieParser = require('cookie-parser');
const session = require('express-session');

var session_id;
var oid;

router.post('/', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log("THis is ", username);
    console.log("THis is ", password);
    knex('users').select('*').where('username', username).then(result => {
        console.log(result);
        if (result.length !== 0) {
            var uid = result[0].uid;
            if (username == result[0].username) {
                if (password == result[0].password) {
                    req.session.oid = result[0].uid;
                    session_id = req.session.oid
                    console.log("result[0].uid",);
                    console.log('This is Session ID', session_id);
                    var status = 'true';
                    res.render('dashboard', { status });
                } else {
                    res.render('login', { errcode: 'Invalid Username or password' });
                }
            } else {
                res.render('login', { title: 'S', errcode: 'Invalid Username or Password' });
            }
        } else {
            res.render('login', { title: 'S', errcode: 'Invalid Username or Password' });
        }
    })

})




module.exports = router;