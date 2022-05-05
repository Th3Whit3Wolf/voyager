import { Router } from "express";
import { UserController, TaskUserController } from "../controllers";

const router = Router();

router.get("/users", UserController.list);
router.get("/users/tasks", TaskUserController.list);
router.get("/users/tasks/:id", TaskUserController.get);
router.get("/users/:id", UserController.get);

// router.put("/users/tasks/:id", TaskUserController.update);

export default router;
