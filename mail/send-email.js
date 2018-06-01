



/*
*
* Sends mail and closes connections
*
*/
function sendMail(mailOptions,transporter){

    try {
        const send = transporter.sendMail((mailOptions))
        transporter.close()
        return send     
    }
    catch(e){
        throw new Error("Whoops there was an error sending the email "+e.message)
    }

}
module.exports = sendMail
