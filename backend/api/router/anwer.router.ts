import express from "express"
import { createAnswer, getAnswers } from "../controller/answer.controller";

const router = express.Router();

router.post("/createanswer",createAnswer)
router.get("/getanswerforquestion/:qid",getAnswers)
router.put("/")

export default router;