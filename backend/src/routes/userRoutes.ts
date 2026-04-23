import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.get("/me", (req, res) => {
  userController.getMe(req, res);
});

export default router;