import { Router } from "express";
import { RoleController } from "../controllers";

const router = Router();

router.get("/roles", RoleController.list);
router.get("/roles/:id", RoleController.get);

export default router;
