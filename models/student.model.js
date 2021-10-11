const db = require('../db/db');
class Students{
    constructor(username, bdate, IsMale){
        this.username = username;
        this.bdate = bdate;
        this.IsMale = IsMale;
    }

    async GetAllStudents(){
        const query = "SELECT FROM `student`"
        return db.runquery(query,[]);
    }
    async Find(username){
        const query = "SELECT FROM `student` WHERE `username` = ?"
        return db.runquery(query,[username]);
    }
    async Add(std){
        const query = "INSERT INTO `student` (`username`, `bdate`, `IsMale`)"
        +"VALUES(?, ?, ?)"
        return db.runquery(query,std);
    }
    async Update(std){
        const query = "UPDATE `student` SET  `bdate` = ?, `IsMale` = ?" 
        +" WHERE `student`.`username` = ?"
        return db.runquery(query,std);
    }
    async Delete(username){
        const query = "DELETE FROM `student` WHERE `username` = ?"
        return db.runquery(query,[username]);
    }
}
module.exports = new Students