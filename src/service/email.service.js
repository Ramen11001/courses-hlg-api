require("dotenv").config({ path: require("path").join(__dirname, "..", "..", ".env") });
const nodemailer = require("nodemailer");

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  if (process.env.SMTP_EMAIL && process.env.SMTP_EMAIL !== "cambia-por-tu-email@gmail.com") {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (err) {
      console.error("SMTP connection verification failed:", err.message);
      transporter = null;
      throw err;
    }
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("Ethereal email user:", testAccount.user);
    console.log("Ethereal email pass:", testAccount.pass);
    console.log("View emails at: https://ethereal.email/login");
  }

  return transporter;
};

const sendResetPasswordEmail = async (toEmail, resetLink) => {
  const t = await getTransporter();

  const mailOptions = {
    from: `"Cursos Holguín" <${process.env.SMTP_EMAIL || "noreply@cursoshlg.com"}>`,
    to: toEmail,
    subject: "Restablecimiento de contraseña",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="background: #0d6efd; color: white; width: 64px; height: 64px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 28px;">&#x1F512;</div>
        </div>
        <h2 style="text-align: center; color: #1a1a2e; margin-bottom: 8px;">Restablecer contraseña</h2>
        <p style="text-align: center; color: #6c757d; margin-bottom: 24px;">¿Está seguro que desea restablecer su contraseña?</p>
        <div style="text-align: center;">
          <a href="${resetLink}" style="display: inline-block; background: #0d6efd; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600;">Sí, restablecer contraseña</a>
        </div>
        <p style="text-align: center; color: #6c757d; font-size: 13px; margin-top: 24px;">Este enlace expirará en 1 hora. Si no solicitaste este cambio, ignora este correo.</p>
        <hr style="border: none; border-top: 1px solid #e9ecef; margin: 24px 0;" />
        <p style="text-align: center; color: #adb5bd; font-size: 12px;">&copy; 2026 Cursos Holguín</p>
      </div>
    `,
  };

  try {
    const info = await t.sendMail(mailOptions);
    console.log("Reset email sent successfully to:", toEmail);
    if (info.messageId) console.log("Message ID:", info.messageId);
    if (nodemailer.getTestMessageUrl(info)) {
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error("Error sending reset email:", error.message);
    console.error("Full error:", error);
    throw new Error("No se pudo enviar el correo. Verifica la conexión SMTP.");
  }
};
module.exports = { sendResetPasswordEmail };
