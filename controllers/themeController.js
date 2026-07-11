import Theme from "../models/Theme.js";

// GET THEME

export const getTheme =

    async (
        req,
        res
    ) => {

        try {

            let theme =
                await Theme.findOne();

            // CREATE DEFAULT

            if (!theme) {

                theme =
                    await Theme.create({
                        activeTheme:
                            "theme1",
                    });
            }

            res.json({
                success: true,
                data: theme,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
            });
        }
    };

// UPDATE THEME

export const updateTheme =
    async (
        req,
        res
    ) => {

        try {

            const {
                activeTheme,
            } = req.body;

            console.log(
                "Updating Theme:",
                activeTheme
            );

            let theme =
                await Theme.findOne();

            // CREATE IF EMPTY

            if (!theme) {

                theme =
                    new Theme({
                        activeTheme,
                    });

            } else {

                theme.activeTheme =
                    activeTheme;
            }

            // SAVE TO DATABASE

            await theme.save();

            console.log(
                "Saved Theme:",
                theme.activeTheme
            );

            res.json({
                success: true,
                data: theme,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
            });
        }
    };

    // THEME HEARTBEAT

export const themeHeartbeat = async (req, res) => {
    
    try {
        let theme = await Theme.findOne();

        if (!theme) {
            theme = await Theme.create({
                activeTheme: "theme1",
            });
        }

        res.json({
            success: true,
            updatedAt: theme.updatedAt,
            message: "Heartbeat Working",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
        });
    }
};