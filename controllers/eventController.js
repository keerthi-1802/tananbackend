import Event from "../models/Event.js";
import fs from "fs";
import path from "path";

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "gallery",
      "title",
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("gallery", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    console.log(req.file);

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/events/${req.file.filename}`
      : "";

    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      chips: JSON.parse(req.body.chips || "[]"),
      image,
      status: req.body.status || "Upcoming",
      gallery:
        req.body.status === "Completed" && req.body.gallery
          ? req.body.gallery
          : null,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    let image = event.image;

    if (req.file) {
      if (event.image) {
        const oldImage = event.image.split("/uploads/")[1];

        const filePath = path.join("uploads", oldImage);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      image = `${req.protocol}://${req.get("host")}/uploads/events/${req.file.filename}`;
    }

    event.title = req.body.title;
    event.description = req.body.description;
    event.location = req.body.location;
    event.day = req.body.day;
    event.month = req.body.month;
    event.year = req.body.year;
    event.chips = JSON.parse(req.body.chips || "[]");
    event.image = image;

    event.status = req.body.status || "Upcoming";

    event.gallery =
      req.body.status === "Completed" && req.body.gallery
        ? req.body.gallery
        : null;

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.image) {
      const pathname = new URL(event.image).pathname;
      const filePath = path.join(process.cwd(), pathname.replace(/^\//, ""));

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await event.deleteOne();

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
