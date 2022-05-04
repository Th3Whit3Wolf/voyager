import { Router } from "express";
import { TaskController } from "../controllers";

const router = Router();

router.get("/tasks", TaskController.list);
router.get("/tasks/:id", TaskController.get);

export default router;
