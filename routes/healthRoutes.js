import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    console.log(
        `[Health] ${new Date().toLocaleTimeString()}`
    );

    res.status(200).json({
        success: true,
        message: "Backend is running",
        timestamp: new Date(),
    });
});

export default router;