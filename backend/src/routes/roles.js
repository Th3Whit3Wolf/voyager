import { Router } from "express";
import { RoleController } from "../controllers";

const router = Router();

router.route("/roles").get(RoleController.list).post(RoleController.create);
router.route("/roles/:id").get(RoleController.get);

export default router;
