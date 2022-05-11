import { Router } from "express";
import { TaskController } from "../controllers";

const router = Router();

router.route("/tasks").get(TaskController.list).post(TaskController.addTask);
router
	.route("/tasks/:id")
	.get(TaskController.get)
	.put(TaskController.update)
	.delete(TaskController.delete);

export default router;
