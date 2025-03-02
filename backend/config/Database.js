import { Sequelize } from "sequelize";

const db = new Sequelize('catatan_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;