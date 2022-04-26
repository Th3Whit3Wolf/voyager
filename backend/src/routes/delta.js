// routes/delta.js
import { Router } from "express";
import {
	keyQuery,
	fullQuery,
	patchContent,
	deleteContent
} from "../utils/index";

const router = Router();
const tableName = "delta";
const idLabel = "deltaID";

router.get("/", fullQuery(req, res, tableName));

router.get(`/:${idLabel}`, keyQuery(req, res, tableName, req.params[idLabel]));

router.patch("/", patchContent(req, res, tableName));

router.delete("/", deleteContent(req, res, tableName));
export default router;
