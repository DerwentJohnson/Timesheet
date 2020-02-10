const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
const cookie = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')

const db = require('./Backend/Db')
const initializePassport = require('./Backend/passport-config');
initializePassport(passport);

var Port = process.env.Port || 8000;

const app = express();

app.use(express.static(__dirname + "/Views/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash())
app.use(cookie())
app.use(session({
    secret: 'iofcanwvboiaqwfhlvblkajwbvdu',
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 600000
    }
}))


app.use(passport.initialize())
app.use(passport.session())


app.post('/',function(req,res,next){
    var user = req.cookies.user.id
    var sql = `CALL get_project_info(?)`
    db.query(sql,user,(err,results,fields) => {
        if (err){
       
            console.log(err)
        }else{
            res.cookie('projects', results[0][0])
            var project = results[0][0]
            var value = [project.id,user]
            sql = `CALL get_timesheet(?,?)`
            db.query(sql,value,(err,results,fields)=>{
                if (err){
                    console.log(err)
                }
                var pageData = [req.cookies.user,req.cookies.projects,results[0]]
                console.log(pageData)
                res.send(pageData)
            });            
        }
    });

});


app.put('/',function(req,res){
    var sql = 'Insert into work_timesheet (work_id,user_id, `date`, start_time, endtime,break_start_time, break_end_time, `comment`) values (?,?,?,?,?,?,?,?)'
    var values = [1,req.cookies.user.id,req.body.sessionDate,req.body.startTime,req.body.endTime,req.body.breakStart, req.body.breakEnd, req.body.sessionComment]
    db.query(sql,values,(err,results,fields)=>{
        if (err) {
            console.log(err)
        }else{
            
            var value = [req.cookies.projects.id,req.cookies.user.id]
            sql = `CALL get_timesheet(?,?)`
            db.query(sql,value,(err,results,fields)=>{
                if (err){
                    console.log(err)
                }
                console.log(results[0])
                res.send(results[0])
            })
        }
    })
});

app.get('/login',function(req,res,next){

    res.sendFile('Login.html',{root: __dirname + '/Views'})
});

app.post('/clients',function (req,res,next) {
    db.query('select * from `client`',function(err,results,fields) {
        res.send(results)
    })
})

app.get('/clients',function (req,res) {
    res.sendFile('Client.html',{root: __dirname + '/Views'})   
})

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
        
      res.cookie('user',user);
      res.redirect('/')
    })(req, res, next);
  });

  
app.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/login');
        }
      });
    }
  });
  

function checkAuthenticated(req,res,next) {
    if (req.isAuthenticated()) {
        
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req,res,next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

// function getProject(user) {
//     console.log(user)
//     var sql = `CALL get_project_info(?)`;
//     console.log(user.id)
//     db.query(sql,user.id,(err,results,fields) => {
        
//         return results
//     })
// }


app.listen(Port, ()=>{
    console.log('Listening on ' + Port);
});
