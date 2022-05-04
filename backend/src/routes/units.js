import { Router } from "express";
import { UnitController } from "../controllers";

const router = Router();

router.get("/units", UnitController.list);
router.get("/units/:id", UnitController.get);

export default router;
