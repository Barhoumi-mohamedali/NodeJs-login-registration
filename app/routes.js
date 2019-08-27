
/*
var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');



module.exports = function(app,passport) {

    
    app.get('/',isLoggedIn,function(req,res){
        var row = [];
        var row2=[];
        connection.query('select * from utilisateurs where id = ?',[req.user.id], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];
                        
                    }  
                }
                console.log(row);
                
            }

            res.render('index.ejs', {rows : row}); // user.ejs ye gönderiyoruz . 
        });
    });

    app.get('/login', function(req, res) {

        res.render('login.ejs',{ message: req.flash('loginMessage') });

    });

    app.get('/signup', function(req, res){
        res.render('signup.ejs',{message: req.flash('message')});
      });

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash : true 
    }));

    app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', 
            failureRedirect : '/login',
            failureFlash : true 
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


};

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/login');
}

*/



var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection); 
var bcrypt = require('bcrypt-nodejs');
var path = require('path');
//var express = require('express');
//var app = express();
//app.set('view engine', 'ejs');


module.exports = function(app,passport) {
	app.set('views', './views');
	//app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'ejs');




    app.get('/',isLoggedIn,function(req,res){

    console.log('hello !')
       var row = [];
        var row2=[];
        connection.query('select * from utilisateurs where id = ?',[req.user.id], function (err, rows,fields) {
	     
	  //  console.log(JSON.stringify(username));
            if (err) {
                console.log(err);
                res.status(404).send(" Something went wrong");
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  
                        row[i] = rows[i];
                        
                    }  
                }
                console.log(JSON.stringify(row));

                
            }

           res.render('profile.ejs', {rows : row }); 

        }); 
    }); 

  // app.get('/',isLoggedIn,function(req,res){ res.render('profile.ejs', {message: req.flash('loginMessage')});  });   

  app.get('/profile', function(req, res) {  res.render('profile.ejs');}); // ligne ajouté 

//app.get('/profile', isLoggedIn, function(req, res){ res.render('profile.ejs', { user:req.user.id }); });


    app.get('/login', function(req, res) {  res.render('login.ejs',{ message: req.flash('loginMessage') });

    });

    app.get('/signup', function(req, res){
        var row = [];
     connection.query('select * from services ' , function (err, rows,fields) {
		if (err) {
                console.log(err);
                res.status(404).send(" Something went wrong");
            } else  {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  
                        row[i] = rows[i];
                        
                    }  
                }
                console.log(JSON.stringify(row));

                
            }

        res.render('signup.ejs',{  rows : row  ,  message: req.flash('signupMessage')});


      });
 });

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash : true 

    }));


     app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', 
            failureRedirect : '/login',
            failureFlash : true 
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
}); 
    app.get('/logout', function(req, res) {
        req.session.destroy(); // ligne ajouté pour detruire la session !
        req.logout();
        res.redirect('/');
    });


};

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/login');

}

