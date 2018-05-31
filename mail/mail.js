/*
*
*Class responsible for setting configurations
*
*/


const Template = require("../template/functions")
const config = require("../config").config
const _mailoptions = require("../config").mailOptions
const _sendMail = require("./send-email")
const nodemailer = require("nodemailer")






function createTransport(config){

    const transport = nodemailer.createTransport({
        service:config.service,
        auth:{
            user:config.auth.user,
            pass:config.auth.pass
        },
        host:config.host,
        port:config.port,
        secure:config.secureConnection

    })
    return transport
}
let transporter
let opt


 class Mail {
    
    

    config(options=config){

        config.service = options.service
        config.auth = options.auth
        config.templateEngine = options.templateEngine
        config.templateFile = options.templateFile

        
      

        transporter = createTransport(config)
        


    }
    mailOptions(options = _mailoptions){
        for(let i in options){
            options[i]=  options[i] || transporter.options[i]
        }
        opt = options

    
        
    }

    async send(){
    

        const templateOptions = {
            engine:config.templateEngine,
            file:config.templateFile
        }

        const template = new Template(config.templateEngine)
        try{
            opt.html = await template.output(templateOptions, opt.data)
        }
        catch(e){
            throw new Error(e)
        }
          
        
            const sendMail=  _sendMail(opt,transporter)
            return sendMail


    }


}
module.exports = Mail
