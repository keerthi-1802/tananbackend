import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },

    imageTitle: {
        type: String,
        default: "",
    },
});

const gallerySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        images: [imageSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Gallery",
    gallerySchema
);