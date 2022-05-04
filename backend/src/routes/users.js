import { Router } from "express";
import { UserController, TaskUserController } from "../controllers";

const router = Router();

router.route("/users").get(UserController.list).post(UserController.create);
router.route("/users/:id").get(UserController.get).put(UserController.update);

router
	.route("/users/tasks")
	.get(TaskUserController.list)
	.post(TaskUserController.create);
router
	.route("/users/tasks/:id")
	.get(TaskUserController.get)
	.put(TaskUserController.update);

export default router;
