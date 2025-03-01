import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Notes = db.define('notes', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: true
});

db.sync().then(() => {
    console.log("table created");
}).catch((error) => {
    console.log("error creating table", error)
})

export default Notes;