const mailer = require("nodemailer");
const utils = require("../utils/utils");

class nodemailer{

    constructor(){
        this.transporter = mailer.createTransport({
            host:CONFIG["mail_host"],
            port:CONFIG["mail_port"],
            secure:true,
            auth:{
                user: CONFIG["mail_user"],
                pass: CONFIG["user_p"]
                },
        });
    }

    async send_message(message){
        try{
            const result =  await this.transporter.sendMail(message)
            return result.messageId;
        }catch(err){
            console.log("Failed to send email");
            console.error(err);
            return false;
        }
    }
}
const node_mailer = new nodemailer();
module.exports = {
    node_mailer
}