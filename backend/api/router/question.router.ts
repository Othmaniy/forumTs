import express from "express";
import { createquestion, dashboard, getsinglequestion, updateQuestion } from "../controller/question.controller";
const router =express.Router();

router.post("/createquestion",createquestion);
router.get("/getquestion/:id",getsinglequestion);
router.put("/updateq/:id",updateQuestion)
router.get("/dashboard",dashboard)

export default router;