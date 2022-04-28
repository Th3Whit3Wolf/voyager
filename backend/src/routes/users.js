import { Router } from "express";
import { Users } from "../controllers";

const router = Router();

router.get("/users", Users.getAll);
router.get("/users/:userID", Users.getByID);

export default router;
