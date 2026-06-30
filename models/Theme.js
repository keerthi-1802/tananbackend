import mongoose from "mongoose";

const themeSchema =
    new mongoose.Schema(
        {
            activeTheme: {
                type: String,

                default:
                    "theme1",
            },
        },
        {
            timestamps: true,
        }
    );

const Theme =
    mongoose.model(
        "Theme",
        themeSchema
    );

export default Theme;