const hasha = require("hasha");

class access_model{

    constructor(user,pwd){
        this.sig = this.#get_sig(user+pwd);
    }

    get_model(){
        return this.sig;
    }

    #get_sig(string){
        string=string+CONFIG.secret
        return hasha(string);
    }

}


module.exports = {
    access_model
}