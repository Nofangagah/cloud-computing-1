import Express from "express";
import { registerUsers, loginUsers, logoutUsers } from "../controller/authController.js";
import { getAccessToken } from "../controller/tokenController.js";

const router = Express.Router();

router.get("/getAccessToken", getAccessToken);

router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.post("/logout", logoutUsers);

export default router;