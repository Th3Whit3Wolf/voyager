import { Router } from "express";
import { Installations } from "../controllers";

const router = Router();

router.get("/installations", Installations.getAll);
router.get("/installations/:installationID", Installations.getByID);

export default router;
