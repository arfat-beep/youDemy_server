import express from "express";
const router = express.Router();
// controllers
import { makeInstructor, getAccountStatus } from "../controllers/instructor";

// middlewares
import { requireSignin } from "../middlewares";

router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getAccountStatus);

module.exports = router;
