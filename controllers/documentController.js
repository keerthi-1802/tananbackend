import fs from "fs";
import path from "path";
import Document from "../models/Document.js";

// ===============================
// Create Document
// ===============================
export const createDocument = async (req, res) => {
  try {
    const { type, title } = req.body;

    if (!type || !title) {
      return res.status(400).json({
        success: false,
        message: "Type and title are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file.",
      });
    }

    const document = await Document.create({
      type,
      title,
      pdf: `/uploads/documents/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Document added successfully.",
      data: document,
    });
  } catch (error) {
    console.error("Create Document Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Documents
// ===============================
export const getDocuments = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = type ? { type } : {};

    const documents = await Document.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Get Documents Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Single Document
// ===============================
export const getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error("Get Document Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Document
// ===============================
export const updateDocument = async (req, res) => {
  try {
    const { type, title } = req.body;

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    document.type = type || document.type;
    document.title = title || document.title;

    if (req.file) {
      const oldFile = path.join(process.cwd(), document.pdf);

      if (fs.existsSync(oldFile)) {
        fs.unlinkSync(oldFile);
      }

      document.pdf = `/uploads/documents/${req.file.filename}`;
    }

    await document.save();

    res.status(200).json({
      success: true,
      message: "Document updated successfully.",
      data: document,
    });
  } catch (error) {
    console.error("Update Document Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Document
// ===============================
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    const filePath = path.join(process.cwd(), document.pdf);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await document.deleteOne();

    res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Document Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};