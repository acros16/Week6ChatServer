module.exports = function(app,fs){
    //Route to manager user logins
    app.get('/api/auth',(req,res) => {

        // localhost:3000/api/auth?username=Terry
        var uname = req.query.username;
        var email;
        var role;
        var userObj;
        console.log(username);
        console.log(email);
        console.log(role);
    
        fs.readFile('authdata.json','utf-8',function(err,data){
            if (err) {
                console.log("error");
                //Some error happend opening the file. No success
                res.send({'username':'username', 'role':'fail', 'email':''});
            }else {
                userObj = JSON.parse(data);
                for (let i=0; i<userObj.length; i++){
                    if (userObj[i].username == uname){
                        //find first instance of user name and success
                        res.send({'username':uname,'role':userObj[i].role,'email':userObj[i].email});
                        return;
                    }
                }
                //no username was found that matched
                console.log("nothing found");
                res.send({'username':'username', 'role':'fail', 'email':''});
            }
        });  
        console.log(req.body);
     });
};