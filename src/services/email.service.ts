import nodemailer from "nodemailer"
import {configs} from "../configs/configs.ts";
import path from "node:path";
import hbs from "nodemailer-express-handlebars";
import {EmailEnum} from "../enums/generalEnums/email.enum.ts";
import {emailConstants} from "../constants/email.constants.js";
import {EmailPayloadType} from "../types/EmailPayloadType.js";

class EmailService{
    private transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            from: "No reply",
            auth: {
                user: configs.SMTP_EMAIL,
                pass: configs.SMTP_PASSWORD
            }
        })

        const hbsOptions = {
            viewEngine: {
                extname: ".hbs",
                defaultLayout: "main",
                layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
                partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
            },
            viewPath: path.join(process.cwd(), "src", "templates", "views"),
            extName: ".hbs",
            extname: ".hbs"
        }

        this.transporter.use("compile", hbs(hbsOptions))

    }

    public async sendEmail<T extends EmailEnum>(type: T, to: string, context: EmailPayloadType[T]): Promise<void>{
        const {subject, template} = emailConstants[type]
        const options = {to, subject, template, context}
        await this.transporter.sendMail(options)
    }

}

export const emailService = new EmailService()