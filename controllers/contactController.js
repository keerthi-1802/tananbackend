import nodemailer from "nodemailer";

export const sendContactMail = async (
  req,
  res
) => {
  try {
    const { name, email, message } =
      req.body;

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:
            process.env.EMAIL_USER,
          pass:
            process.env.EMAIL_PASS,
        },
      });

    // Verify SMTP connection
    await transporter.verify();

    console.log(
      "SMTP Connected Successfully"
    );

    const info =
      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,

        to: "kiruthikamadhura@gmail.com",

        subject:
          "New Contact Form Submission",

        html: `
          <h2>Contact Form Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

    // console.log(
    //   "Mail Result:",
    //   info
    // );

    res.status(200).json({
      success: true,
      message:
        "Email sent successfully",
    });
  } catch (error) {
    console.log(
      "MAIL ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to send email",
    });
  }
};