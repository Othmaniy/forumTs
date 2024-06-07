import express from "express"
import { createaccount } from "../controller/user.controller";
import {login } from "../controller/user.controller";
const router = express.Router();


router.post("/createaccount",createaccount)
router.post("/login",login)
export default router;