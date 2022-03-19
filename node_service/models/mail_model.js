class mail_model{
    constructor(sender,receiver,subject,text,html=""){
        this.message = {
            from:sender,
            to:receiver,
            subject:subject,
            text:text,
            html:html
        };
    }

    get_model(){
        return this.message;
    }
}

module.exports = {
    mail_model
}