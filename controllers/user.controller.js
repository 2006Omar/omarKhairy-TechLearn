const users = require('../models/user.model');
const hashText = require('../middleware/hashText');
const authen = require('../middleware/Authentication');
const students = require('../models/student.model');

async function getAllUsers(req, res){  
    users.getAllUsers()
        .then(result=>{
            res.status(200).json({success:true, data: result[0]});
        })
        .catch(err=>{
            res.status(400).json({success:false, error: err.message});
        });
        students.GetAllStudents()
        .then(result=>{
            res.status(200).json({success:true, data: result[0]});
        })
        .catch(err=>{
            res.status(400).json({success:false, error: err.message});
        });
}

async function findUser(req, res, next){
    console.log(req.params.user)
    users.find(req.params.user)
        .then(result=>{
            if(result[0].length>0)
                res.status(200).json({success:true, data: result});
            else
                res.status(204).json({success:false, data: "User Does Not Exists"});
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({success:false, error: err.message});
        });
        
        
}

async function login(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    let loginData = await users.getLoginData(username);
    let hashedPass = loginData.password;
    let email = loginData.email;
    hashText.createEncryptText(password)
        .then(hashedPas=>{
            console.log(hashedPas);
        })
    hashText.compareDeryptWithEncrypt(password, hashedPass)
        .then(correct=>{
            createToken(username, email, "login success", res);
        })
        .catch(incorrect=>{
            res.status(400).json({success:false, msg:"password or username wrong", error:incorrect})
        })
}

async function createToken(username, email, msg, res){
    authen.createToken({username: username, email: email})
        .then(token=>{
            res.status(200).json({success:true, msg: msg, token: token, user: username, email: email});
        })
        .catch(err=>{
            res.status(200).json({success:true, msg: msg, token: 'Invalid Token Try To Login'});
        })
}

async function addUser(req, res, next){
    hashText.createEncryptText(req.body.password)
        .then(hashedPass=>{
            let user = [
                req.body.username,
                hashedPass,
                req.body.email,
                req.body.name,
                0, //admin
                0, //super editor
                0,//editor
                1,//student
            ]
            let std = [
                req.body.username,
                req.body.bdate,
                req.body.IsMale
            ]
            //validation
            users.add(user)
                .then(result=>{
                    console.log(result)
                    students.Add(std)
                        .then(result=>{
                            createToken(req.body.username, req.body.email, "user added successfully", res);
                            // authen.createToken({username: req.body.username, email: req.body.email})
                            // .then(token=>{
                            //     res.status(200).json({success:true, msg: 'User Added Successfully', token: token});
                            // })
                            // .catch(err=>{
                            //     res.status(200).json({success:true, msg: 'User Added Successfully', token: 'Invalid Token Try To Login'});
                            // })
                        })    
                })
                .catch(err=>{
                    res.status(400).json({success:false, msg:"User Can't Be Added", error: err.message});
                });
        })
        .catch(err=>{
            res.status(400).json({success:false, msg:"Please Enter A valid Password", error: err.message});
        })
}

async function updateUser(req, res, next){
    hashText.createEncryptText(req.body.password)
        .then(hashedPass=>{
            let user = [
                hashedPass,
                req.body.email,
                req.body.name,
                req.body.username
            ]
            let std = [
                req.body.bdate,
                req.body.IsMale,
                req.body.username
            ]
            users.update(user)
                .then(result=>{
                    students.Update(std)
                    .then(result=>{
                        res.status(200).json({success:true, msg:"Student and User Are Updated Successfully", data: result})
                    })    
                    .catch(err=>{
                        res.status(400).json({success:true, msg:"User Is Updated But Student Can't be Updated", error: err.message})
                    })
                })
                .catch(err=>{
                    res.status(400).json({success:false, msg:"User And Student Can't Be Updated", error: err.message});
                });
        })
        .catch(err=>{
            res.status(400).json({success:false, msg:"User And Student Can't Not Exisit To Update It", error: err.message});
        })
}

async function deleteUser(req, res){
    students.Delete(req.body.username)
        .then(result=>{ 
            users.delete(req.body.username)
                .then(result=>{
                    res.status(200).json({success:true, msg:"user And student deleted successfully", data: result});
                })
                .catch(err=>{
                    res.status(400).json({success:false, msg:"User Can't Be Deleted but student deleted successfully", error: err.message});
                });
        })
        .catch(err=>{
            res.status(400).json({success:false, msg:"Student And User Can't Be Deleted", error: err.message});
        });
}
module.exports = {getAllUsers, findUser, addUser, updateUser, deleteUser, login};