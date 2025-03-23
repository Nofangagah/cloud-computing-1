import { Sequelize } from "sequelize";


const db = new Sequelize("notes_023", "admin", "nofangagah", {
    host: "34.136.84.192",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

export default db;