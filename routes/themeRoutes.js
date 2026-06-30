import express from "express";

import {
    getTheme,
    updateTheme,
} from "../controllers/themeController.js";

const router =
    express.Router();

// GET

router.get(
    "/",
    getTheme
);

// UPDATE

router.put(
    "/update",
    updateTheme
);

export default router;