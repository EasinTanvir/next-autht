import nodemailer from "nodemailer";
import USER from "@/models/auth";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const token = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await USER.findByIdAndUpdate(
        userId,
        {
          verifyToken: token,
          verifyTokenExpire: Date.now() + 3600000,
        },
        { new: true }
      );
    } else if (emailType === "RESET") {
      await USER.findByIdAndUpdate(
        userId,
        {
          forgotPassowordToken: token,
          forgotPassowordexpire: Date.now() + 3600000,
        },
        { new: true }
      );
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAIL_USER,
        pass: process.env.NODEMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "easin@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your password",
      html: `<p>Click <a href="${
        process.env.SERVER_URL
      }/verifyemail?token=${token}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset Your password"
      } </p>`,
    };

    const res = await transport.sendMail(mailOptions);
    return res;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
