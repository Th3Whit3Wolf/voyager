import { Router } from "express";
import { TaskController } from "#controllers";
import { checkIfAuthenticated } from "../middlewares/auth";

const router = Router();

router
	.route("/tasks")
	.get(checkIfAuthenticated, TaskController.list)
	.post(checkIfAuthenticated, TaskController.addTask);
router
	.route("/tasks/:id")
	.get(checkIfAuthenticated, TaskController.get)
	.put(checkIfAuthenticated, TaskController.update)
	.delete(checkIfAuthenticated, TaskController.delete);

export default router;
