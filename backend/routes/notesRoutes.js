import Express from "express";
import { getAllNotes, addNotes, editNotes, deleteNotes } from "../controller/notesController.js";

const router = Express.Router();

router.get("/notes", getAllNotes);
router.post("/addNotes", addNotes);
router.put("/editNotes/:id",  editNotes);
router.delete("/deleteNotes/:id", deleteNotes);

export default router;