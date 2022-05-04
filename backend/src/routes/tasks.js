import { Router } from "express";
import { TaskController } from "../controllers";

const router = Router();

router.route("/tasks").get(TaskController.list).post(TaskController.create);
router.route("/tasks/:id").get(TaskController.get);

export default router;
