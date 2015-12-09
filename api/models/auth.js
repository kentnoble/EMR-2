/**
 * Created by alain.bibera on 9/27/2015.
 */
'user strict';

var jwt = require('jwt-simple');

var auth = {

    login: function(req, res){
        var username = req._body.username || '';
        var password = req._body.password || '';

        if(username == '' || password == ''){
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        // Fire a query to your DB and check if the credentials are valid
        var dbUserObj = auth.validate(username, password);

        if(!dbUserObj){

        }
    },

}