const db = require('../db/db');
class Users{
    constructor(username, password, email, name){
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
    }
    isAdmin(admin){
        if(admin == undefined)
            return this.IsAdmin;
        else    
            this.IsAdmin = admin;
    }
    isSuperEditor(superEditor){
        if(superEditor == undefined)
            return this.IsSuper;
        else    
            this.IsSuper = editor;
    }
    isEditor(editor){
        if(editor == undefined)
            return this.IsEditor;
        else    
            this.IsEditor = editor;
    }
    isStudent(student){
        if(student == undefined)
            return this.isStudent;
        else    
            this.isStudent = student;
    }
    async getAllUsers(){
        const query = "SELECT `username`, `email`, `name`, `IsAdmin`, `IsSuper`, `IsEditor`, `isStudent` FROM `users`";
        return db.runquery(query,[]);
    }
    async find(username){
        const query = "SELECT `username`, `email`, `name`, `IsAdmin`, `IsSuper`, `IsEditor`, `isStudent` FROM `users` WHERE `username`=?";
        return db.runquery(query,[username]);
    }
    async getLoginData(username){
        const query = "SELECT `password`, `email` FROM `users` WHERE `username`=?";
        return db.runquery(query,[username]);
    }
    async add(user){
        const query = "INSERT INTO `users` (`username`, `password`, `email`, `name`, `IsAdmin`, `IsSuper`, `IsEditor`, `isStudent`)" 
        + " VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
        return db.runquery(query,user);
    }
    async update(user){
        const query = "UPDATE `users` SET `password` = ?, `email` = ?, `name` = ?" 
        +" WHERE `users`.`username` = ?"
        return db.runquery(query,user);
    }
    async delete(username){
        const query = "DELETE FROM `users` WHERE `username` = ?"
        return db.runquery(query,[username]);
    }
}
module.exports = new Users;