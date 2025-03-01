import { Sequelize } from "sequelize";


const db = new Sequelize("notes_023", "root", "", {
    host: "localhost",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

export default db;