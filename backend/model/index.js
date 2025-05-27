import Users from "./usersModel.js";
import Notes from "./notesModel.js";
import db from "../config/database.js";

Users.hasMany(Notes, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Notes.belongsTo(Users, {foreignKey: 'user_id', onDelete: 'CASCADE'});


export { db,Users, Notes };