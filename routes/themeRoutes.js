import express from "express";

import {
    getTheme,
    updateTheme,
    themeHeartbeat,
} from "../controllers/themeController.js";

const router =
    express.Router();

// GET

router.get(
    "/",
    getTheme
);
// HEARTBEAT
router.get("/heartbeat", (req, res, next) => {
    next();
}, themeHeartbeat);

// UPDATE

router.put(
    "/update",
    updateTheme
);

export default router;