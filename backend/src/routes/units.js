import { Router } from "express";
import { UnitController } from "#controllers";
import { checkIfAuthenticated } from "../middlewares/auth";

const router = Router();

router
	.route("/units")
	.get(checkIfAuthenticated, UnitController.list)
	.post(checkIfAuthenticated, UnitController.create);

router
	.route("/units/:id")
	.get(checkIfAuthenticated, UnitController.get)
	.put(checkIfAuthenticated, UnitController.update)
	.delete(checkIfAuthenticated, UnitController.delete);

export default router;
