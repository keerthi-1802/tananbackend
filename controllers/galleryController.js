import fs from "fs";
import path from "path";
import Gallery from "../models/Gallery.js";

// Create Gallery

export const createGallery = async (
    req,
    res
) => {
    try {
        const imageTitles =
            req.body.imageTitles
                ? JSON.parse(
                      req.body.imageTitles
                  )
                : [];

        const images =
            req.files?.map(
                (
                    file,
                    index
                ) => ({
                    image:
                        `/uploads/galleries/${file.filename}`,
                    imageTitle:
                        imageTitles[
                            index
                        ] || "",
                })
            ) || [];

        const gallery =
            await Gallery.create({
                title:
                    req.body.title,
                description:
                    req.body.description,
                images,
            });

        res.status(201).json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};

// Get All Galleries

export const getGalleries =
    async (req, res) => {
        try {
            const galleries =
                await Gallery.find().sort(
                    {
                        createdAt:
                            -1,
                    }
                );

            res.json({
                success: true,
                data: galleries,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// Get Single Gallery

export const getGallery =
    async (req, res) => {
        try {
            const gallery =
                await Gallery.findById(
                    req.params.id
                );

            if (!gallery) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Gallery not found",
                });
            }

            res.json({
                success: true,
                data: gallery,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// Update Gallery

export const updateGallery =
    async (req, res) => {
        try {
            const gallery =
                await Gallery.findById(
                    req.params.id
                );

            if (!gallery) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Gallery not found",
                });
            }

            gallery.title =
                req.body.title;

            gallery.description =
                req.body.description;

            const existingImages =
                req.body
                    .existingImages
                    ? JSON.parse(
                          req.body
                              .existingImages
                      )
                    : [];

            const imageTitles =
                req.body
                    .imageTitles
                    ? JSON.parse(
                          req.body
                              .imageTitles
                      )
                    : [];

            // Delete removed images from uploads folder

            const removedImages =
                gallery.images.filter(
                    (
                        oldImage
                    ) =>
                        !existingImages.some(
                            (
                                existingImage
                            ) =>
                                existingImage.image ===
                                oldImage.image
                        )
                );

            removedImages.forEach(
                (
                    img
                ) => {
                    const imagePath =
                        path.resolve(
                            process.cwd(),
                            img.image.startsWith(
                                "/"
                            )
                                ? img.image.slice(
                                      1
                                  )
                                : img.image
                        );

                    console.log(
                        "Deleting:",
                        imagePath
                    );

                    if (
                        fs.existsSync(
                            imagePath
                        )
                    ) {
                        fs.unlinkSync(
                            imagePath
                        );
                    }
                }
            );

            const newImages =
                req.files?.map(
                    (
                        file,
                        index
                    ) => ({
                        image:
                            `/uploads/galleries/${file.filename}`,
                        imageTitle:
                            imageTitles[
                                index
                            ] || "",
                    })
                ) || [];

            gallery.images = [
                ...existingImages,
                ...newImages,
            ];

            await gallery.save();

            res.json({
                success: true,
                data: gallery,
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// Delete Gallery

export const deleteGallery =
    async (req, res) => {
        try {
            const gallery =
                await Gallery.findById(
                    req.params.id
                );

            if (!gallery) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Gallery not found",
                });
            }

            gallery.images.forEach(
                (
                    img
                ) => {
                    const imagePath =
                        path.resolve(
                            process.cwd(),
                            img.image.startsWith(
                                "/"
                            )
                                ? img.image.slice(
                                      1
                                  )
                                : img.image
                        );

                    console.log(
                        "Deleting:",
                        imagePath
                    );

                    if (
                        fs.existsSync(
                            imagePath
                        )
                    ) {
                        fs.unlinkSync(
                            imagePath
                        );
                    }
                }
            );

            await Gallery.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Gallery deleted successfully",
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };