import { Router } from "express";
import { Roles } from "../controllers";

const router = Router();

router.get("/roles", Roles.getAll);
router.get("/roles/:roleID", Roles.getByID);

export default router;
