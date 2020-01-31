const bcrypt = require('bcrypt');

 


    function hasPassword( password){
        bcrypt.hash(password,function(err,hash) {
            //should call method to insert into database
        });
    }

    function comparePassword(){
        
    }