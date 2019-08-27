var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
     console.log('serializeUser: ' + user.id)
       // done(null, user.id);
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM utilisateurs WHERE id = ? ",[id], function(err, rows){
	    console.log(rows); 
            console.log(err); 
            done(err, rows[0]);
          // done(err, false);   // invalidates the existing login session.
        });
    });


    passport.use(
        'local-signup',
        new LocalStrategy({

            usernameField : 'username',
            passwordField : 'password',
            usecaseField : 'usecase',
            urlField : 'url',
            passReqToCallback : true 
        },
        function(req, username, password, usecase, url, done) {

            connection.query("SELECT * FROM utilisateurs WHERE username = ?",[username], function(err, rows) {
          //  connection.query("SELECT * FROM url", function(err, rows1) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {

                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null),
			usecase : usecase ,
			url: url
                    };

                     var insertQuery = "INSERT INTO utilisateurs (username,password) values ('" + newUserMysql.username + "','" + newUserMysql.password + "')";
	        

                    connection.query(insertQuery,newUserMysql,function(err, rows,fields) {

		      connection.query("INSERT INTO url  (url) values ('" + newUserMysql.url + "')",newUserMysql,function(err, rows1,fields) {

 			connection.query("INSERT INTO liaison_url_user (id_url,id_user) values ('" + rows1.insertId + "','" + rows.insertId + "')",newUserMysql,function(err, rows3 ,fields) {
 			connection.query("INSERT INTO liaison_services_url (id_services,id_url) values ('" + newUserMysql.usecase+ "','" + rows1.insertId + "')",newUserMysql,function(err, rows4 ,fields) {

			if(err) {

            		  console.error(err);
          		  return;

      			  }
			console.log('queries inserted', rows4); 
                        newUserMysql.id = rows4.insertId;
  		        console.log(rows4.insertId);
                        console.log(' user added !');

                       return done(null, newUserMysql);
			

 			});			 
			});
		      });
                    });
                }
            });
        })
//})
    );

  passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
   function(req, username, password, usecase, url, done){
  	console.log('I was given ' + username + " and " + password);


 		   var newUserMysqllogin = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null),

                    };

   connection.query("SELECT * FROM utilisateurs WHERE username = ? ", [username],

   function(err, rows){
    if(err)
     //
	//throw (err);
        return done(err);
    if(!rows.length){

     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }

    if(!bcrypt.compareSync(password, rows[0].password))


     return done(null, false, req.flash('loginMessage', 'Wrong Password'));


     // all is well, return successful user
      var user_loging = rows[0];
     return done(null, user_loging ,  req.flash( 'Logged In Successfully')); 
	
   // if(err) return done(err);
            });
        })
    );
};
