const express = require('express');
const bodyParser = require('body-parser');

var Port = process.env.Port || 8000;

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile('Index.html',{root: __dirname + '/Views'})
});

app.post('/login', function(req,res){
    
    let username = req.body.username;
    let password = req.body.password;

    
    res.sendFile('timesheet.html', {root: __dirname + '/Views'});
});


app.listen(Port, ()=>{
    console.log('Listening on ' + Port);
});
