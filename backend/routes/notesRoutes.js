import Express from "express";
import { getAllNotes, addNotes, editNotes, deleteNotes } from "../controller/notesController.js";
import  verifyToken  from "../middleware/verifyToken.js";

const router = Express.Router();

router.get("/notes", verifyToken, getAllNotes);
router.post("/addNotes", verifyToken, addNotes);
router.put("/editNotes/:id", verifyToken,  editNotes);
router.delete("/deleteNotes/:id", verifyToken, deleteNotes);

export default router;