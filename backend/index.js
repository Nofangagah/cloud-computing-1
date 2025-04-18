import Express from "express";
import cors from "cors";
import noteRoute from "./routes/notesRoutes.js";


const app = Express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(Express.json());

app.use(noteRoute);

app.listen(port, () => {
    console.log(`Note apps listening on port ${port}`)
})