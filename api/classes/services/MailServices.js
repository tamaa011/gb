const nodemailer = require("nodemailer");
const config = require("../../../config/config.json")

class MailService {

    getTransaporter() {

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.adminEmail,
                pass: config.adminEmailPassword
            }
        });
    }

    main(transporter, mailOptions) {

        transporter.sendMail(mailOptions)
    }

    getMailOptions(mailObj) {

        return { ...mailObj, from: config.adminEmail }
    }

    sendMail(emailObj) {

        try {

            let transporter = this.getTransaporter();
            let mailOptions = this.getMailOptions(emailObj)
            this.main(transporter, mailOptions)

        } catch (error) {

            console.log(error);

        }
    }
}

module.exports = new MailService()