const jwt = require('jsonwebtoken');
const { privatekey } = require('../config/config')
class Authentication{
    static createToken(tokenPayloadData){
        return new Promise((resolve, reject)=>{
            try{
                const token = jwt.sign(tokenPayloadData, privatekey, {expiresIn:"1h"});
                resolve(token);
            }catch(err){
                reject(err);
            }
            
        })
    }
    static decodeToken(token){
        return new Promise((resolve, reject)=>{
            try{
                const decodeToken = jwt.verify(token, privatekey);
                resolve(decodeToken);
            }catch(err){
                reject(err);
            }
            
        })
    }
}
module.exports = Authentication;