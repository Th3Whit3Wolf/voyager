import { Router } from "express";
import { Squadrons } from "../controllers";

const router = Router();

router.get("/squadrons", Squadrons.getAll);
router.get("/squadrons/:squadronID", Squadrons.getByID);

export default router;
