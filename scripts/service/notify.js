import { createTransport } from "nodemailer";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv"

// dotenv

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(path.join(__dirname, "../.env"))
})


const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.admMail,
        pass: process.env.adm2
    }
})


async function mailNotification (subject, bodyTitle, bodyText, toEmail) {

    const mailOptions = {
        from: "Node Server",
        to: `${toEmail + "," + process.env.admMail}`,
        subject: subject,
        html: `<h1>'${bodyTitle}'</h1><div>'${bodyText}'</div>`
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

export default mailNotification
