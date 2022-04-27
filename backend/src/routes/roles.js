import { Router } from "express";
import { Roles } from "../controllers";

const router = Router();

router.get("/roles", Roles.getAll);
router.get("/roles/users", Roles.getAllUsers);
router.get("/roles/admins", Roles.getAllAdmins);
router.get("/roles/admins/site", Roles.getAllSiteAdmins);
router.get("/roles/admins/installation", Roles.getAllSiteAdmins);
router.get("/roles/admins/command", Roles.getAllCommandAdmins);
router.get("/roles/admins/delta", Roles.getAllDeltaAdmins);
router.get("/roles/admins/squadron", Roles.getAllSquadronAdmins);
router.get("/roles/:roleID", Roles.getByID);

export default router;
