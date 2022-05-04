import { Router } from "express";
import { Units } from "../controllers";

const router = Router();

router.get("/units", Units.getAll);
router.get("/units/:unitID", Units.getByID);

export default router;
