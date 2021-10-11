const bycrypt = require('bcrypt');
const { salt } = require('../config/config');
class textCrypt{
    static createEncryptText(plainText){
        return new Promise((resolve, reject)=>{
            bycrypt.hash(plainText, salt)
                .then(hashedPass=>{
                    resolve(hashedPass);
                })
                .catch(err=>{
                    reject(err);
                });
        });
    }
    static compareDeryptWithEncrypt(plainText,hashText){
        return new Promise((resolve, reject)=>{
            bycrypt.compare(plainText, hashText)
                .then(same=>{
                    if(same)
                        resolve(true);
                    else
                        reject(false);    
                })
                .catch(err=>{
                    reject(err);
                });
        })
    }
}
module.exports = textCrypt;