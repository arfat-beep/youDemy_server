import express from "express";
const router = express.Router();
// controllers
import { makeInstructor } from "../controllers/instructor";

// middlewares
import { requireSignin } from "../middlewares";

router.post("/make-instructor", requireSignin, makeInstructor);

module.exports = router;
