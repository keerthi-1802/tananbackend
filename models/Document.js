import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["policy", "regional"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    pdf: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Document", documentSchema);