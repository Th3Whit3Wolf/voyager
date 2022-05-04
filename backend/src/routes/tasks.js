import { Router } from "express";
import { Tasks } from "../controllers";

const router = Router();

router.get("/tasks", Tasks.getAll);
router.get("/tasks/:taskID", Tasks.getByID);

export default router;
