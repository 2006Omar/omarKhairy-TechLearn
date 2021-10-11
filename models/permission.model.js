const db = require('../db/db');
class Permissions{
    constructor(role, url, method){
        this.role = role;
        this.method = url;
        this.method = method;
    }
    async getAllPermissions(role){
        const query = "SELECT * FROM `permissions` WHERE `role`=?";
        return db.runquery(query,[role]);
    }
    async find(role, url, method){
        const query = "SELECT * FROM `premissions` WHERE `role`=? and (`url`=? or `url`=`*`) and (INSTR(`method`,?) or `method`=`*`)";
        return db.runquery(query,[role, url, method]);
    }
    async add(permissions){
        const query = "INSERT INTO `permissions` (`role`, `url`, `method`)" 
        + " VALUES (?, ?, ?);";
        return db.runquery(query,permissions);
    }
    async update(permissions){
        const query = "UPDATE `permissions` SET `url` = ?, `method` = ?" 
        +" WHERE `users`.`role` = ?"
        return db.runquery(query,permissions);
    }
    async delete(role){
        const query = "DELETE FROM `permissions` WHERE `role` = ?"
        return db.runquery(query,[role]);
    }
}
module.exports = new Permissions;