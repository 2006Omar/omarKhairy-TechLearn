const Authentication = require("./Authentication");

class Authorization{
    authorize(req, res, next){
        let token = req.headers.token;
        if(token == undefined || token == "" || token == null || token == "null"){
            res.status(400).json({success: false, error: "you must add token to your header"})
        }else{
            Authentication.decodeToken(token)
                .then(decodetoken=>{
                    console.log(decodetoken)
                    next();
                })
                .catch(err=>{
                    res.status(400).json({success: false, error: "your token is not valid"})
                })
            next();
        }
    }
}

module.exports = new Authorization;