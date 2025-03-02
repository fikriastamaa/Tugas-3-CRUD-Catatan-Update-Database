import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const Catatan = db.define('catatan', {
    judul: DataTypes.STRING,
    isi: DataTypes.TEXT,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
});

export default Catatan;

(async () => {
    await db.sync();
})();