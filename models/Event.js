import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        day: {
            type: String,
            required: true,
        },

        month: {
            type: String,
            required: true,
        },

        year: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        chips: [
            {
                type: String,
            },
        ],

        status: {
            type: String,
            enum: ["Upcoming", "Completed"],
            default: "Upcoming",
        },

        gallery: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gallery",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Event", eventSchema);