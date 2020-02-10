const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const db = require('./db')

function intialize(passport) {
    
    passport.use(new LocalStrategy(
        function authenticateUser(username, password,done) {
            var sql = `CALL get_user_by_username(?)`;
            db.query(sql,username,(error, results, fields) =>{
                if (error) {
                    done(error)
                }
                if (results.length === 0) {
                    
                    done(null,{message: 'Username does not exist'})
                }
                var hash = results[0][0].userPassword
                var user_id = results[0][0].id
                var fname = results[0][0].first_name
                var lname = results[0][0].last_name
                bcrypt.compare(password,hash,function(err,response) {
                    if (response === true) {
                        return done(null, {id: user_id, username: username, fname: fname, lname: lname})
                    }else{
                        return done(null,{message: 'Password does not match username'})
                    }
                });
                
    })
            
        }
    ))
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(user, done) {

          var sql = 'select id from users where id = ?;'
       db.query(sql, user,(err,results,fields)=>{
           
        if (err) {
            done(err)
        }
        if (results.length === 0) {
            done(null,false)
        }
        return done(null,results)
       })
      });
}

module.exports = intialize;