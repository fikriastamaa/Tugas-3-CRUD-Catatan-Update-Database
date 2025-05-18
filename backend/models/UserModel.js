import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const User = db.define('user', {
    email : Sequelize.STRING,
    username : Sequelize.STRING,
    password : Sequelize.STRING,
    refresh_token : Sequelize.TEXT,
}, 
    { freezeTableName: true,}
);

db.sync().then(() => console.log("Sudah Terkoneksi ke Database"));

export default User;