import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import themeRoutes from "./routes/themeRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

/* Middleware */

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static("uploads")
);

/* Routes */

app.use(
    "/api/themes",
    themeRoutes
);

app.use(
    "/api/events",
    eventRoutes
);

app.use(
    "/api/galleries",
    galleryRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
    "/api/documents", 
     documentRoutes);

/* Health Check */

app.get("/", (req, res) => {
    res.send("API Running");
});

/* MongoDB */

mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        console.log(
            "MongoDB Connected"
        );

        const PORT =
            process.env.PORT ||
            5000;

        app.listen(PORT, () => {
            console.log(
                `Server running on ${PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });