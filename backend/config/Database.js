import { Sequelize } from "sequelize";

const db = new Sequelize('catatan_api', 'root', '', {
    host: '34.170.151.243',
    dialect: 'mysql',
});

export default db;