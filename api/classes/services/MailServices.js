const nodemailer = require("nodemailer");
const config = require("../../../config/config.json")

class MailService {

    getTransaporter() {
            
        return nodemailer.createTransport({
            host: config.mailHost,
            port: config.mailPort,
            secure: false,
            auth: {
                user: config.adminEmail,
                pass: config.adminEmailPassword
            }
        });
    }

    async main(transporter, emailObj) {

        await transporter.sendMail({
            from: config.adminEmail,
            to: emailObj.userEmail || "ebrahimali192@yahoo.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>"
        });
    }

    async sendMail(emailObj) {

        try {

            let transporter = this.getTransaporter();
            await this.main(transporter, emailObj)

        } catch (error) {

            console.log(error);

        }
    }
}

module.exports = new MailService()