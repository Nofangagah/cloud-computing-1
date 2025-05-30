import Express from "express";
import cors from "cors";
import noteRoute from "./routes/notesRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes.js";
import { db } from "./model/index.js";
dotenv.config();


const app = Express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors({
  origin: "https://h-07-450914.uc.r.appspot.com", 
  credentials: true
}));

app.use(Express.json());

db.sync({alter: true}).then(() => {
    console.log("table created");
}).catch((error) => {
    console.log("error creating table", error)
})
app.use("/auth", authRoute);
app.use("/notes", noteRoute);

app.listen(port, () => {
    console.log(`Note apps listening on port ${port}`)
})