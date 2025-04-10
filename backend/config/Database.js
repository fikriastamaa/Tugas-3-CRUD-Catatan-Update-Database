import { Sequelize } from "sequelize";

const db = new Sequelize('catatan_api', 'root', 'stecu', {
    host: '34.122.115.239',
    dialect: 'mysql',
});

export default db;