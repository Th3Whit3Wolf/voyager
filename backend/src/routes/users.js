import { Router } from "express";
import { UserController, TaskUserController } from "#controllers";
import checkIfAuthenticated from "../middlewares/auth";

const router = Router();

router
	.route("/users")
	.get(checkIfAuthenticated, UserController.list)
	.post(checkIfAuthenticated, UserController.create);
router
	.route("/users/:id")
	.get(checkIfAuthenticated, UserController.get)
	.put(checkIfAuthenticated, UserController.update)
	.delete(checkIfAuthenticated, UserController.delete);

router
	.route("/users/tasks")
	.get(checkIfAuthenticated, TaskUserController.list)
	.post(checkIfAuthenticated, TaskUserController.create);
router
	.route("/users/tasks/:id")
	.get(checkIfAuthenticated, TaskUserController.get)
	.delete(checkIfAuthenticated, TaskUserController.delete)
	.put(checkIfAuthenticated, TaskUserController.update);

export default router;
