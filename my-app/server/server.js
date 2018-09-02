const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../dist/my-app/')));
app.route('/api/auth').post(function(req,res) {

    // Function to return user's details given their username
    var uname = req.body.username;
    var userObj;

    fs.readFile('authdata.json','utf-8',function(err,data){
        if (err) {
            console.log("error");
            //Some error happend opening the file. No success
            res.send({'username':'Invalid User!', 'role':'Failed login', 'email':''});
        }else {
            userObj = JSON.parse(data);
            for (let i=0; i<userObj.length; i++){
                if (userObj[i].username == uname){
                    //find first instance of user name and success
                    res.send({'username':uname,'role':userObj[i].role,'email':userObj[i].email,'groups':userObj[i].groups});
                    return;
                }
            }
            //no username was found that matched
            console.log("nothing found");
            res.send({'username':'username', 'role':'fail', 'email':''});
        }
    });  
 });
app.route('/api/reg').post(function(req , res) {

    // Function to add a new user
    var isUser = 0;
    var userObj;
    //locahost3000:/api/reg?username=abcdefg
    var uname = req.body.username;
    var role = req.body.role;
    var email = req.body.email;

    fs.readFile('authdata.json','utf-8', function(err,data){
        if (err){
            console.log(err);
        }else{
            userObj = JSON.parse(data);
            for (let i=0;i<userObj.length;i++){
                if (userObj[i].name == uname){
                    //Check for duplicates
                    isUser = 1;
                }
            }
            if (isUser>0){
                //Name already exists in the file
                alert("User already exists");
            } else{
                //Add name to list of names
                userObj.push({"username":uname,"role":role,"email":email,"groups":[{"groupname":"Alpha"}]});
                //Prepare data for writing (convert to a string)
                var newdata = JSON.stringify(userObj);
                fs.writeFile('authdata.json',newdata,'utf-8', function(err){
                    if (err) throw err;
                    //Send response that registration was successful
                    res.send({"username":uname});
                });
            }
        }
    })
});
require('./routes.js')(app,path);
require('./socket.js')(app,io);
//require('./routes/auth.js')(app,fs); ***Requiring external auth.js and reg.js file was not working so both were placed directly in server.js***
require('./listen.js')(http);
