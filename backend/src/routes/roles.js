import { Router } from "express";
import { RoleController } from "#controllers";
import { checkIfAuthenticated } from "../middlewares/auth";

const router = Router();

router
	.route("/roles")
	.get(checkIfAuthenticated, RoleController.list)
	.post(checkIfAuthenticated, RoleController.create);
router
	.route("/roles/:id")
	.get(checkIfAuthenticated, RoleController.get)
	.put(checkIfAuthenticated, RoleController.update)
	.delete(checkIfAuthenticated, RoleController.delete);

export default router;
