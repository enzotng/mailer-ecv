import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVER,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function envoyerEmail(sujet: string, texte: string) {
    const options = {
        from: `"Mailer - ECV" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEPTION,
        subject: sujet,
        text: texte,
    };

    try {
        const info = await transporter.sendMail(options);
        console.log(`Email envoyé : ${info.response}`);
    } catch (err) {
        console.error(`Erreur lors de l'envoi de l'email : ${err}`);
    }
}
