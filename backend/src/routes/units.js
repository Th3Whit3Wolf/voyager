import { Router } from "express";
import { UnitController } from "../controllers";

const router = Router();

router.route("/units").get(UnitController.list).post(UnitController.create);

router.route("/units/:id").get(UnitController.get);

export default router;
