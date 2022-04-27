import { Router } from "express";
import { Deltas } from "../controllers";

const router = Router();

router.get("/deltas", Deltas.getAll);
router.get("/deltas/:deltaID", Deltas.getByID);

export default router;
