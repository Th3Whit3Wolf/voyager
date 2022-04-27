import { Router } from "express";
import { Commands } from "../controllers";

const router = Router();

router.get("/commands", Commands.getAll);
router.get("/commands/:commandID", Commands.getByID);

export default router;
