import sgmail from '@sendgrid/mail'

const sendMail = async(options)=>{
   sgmail.setApiKey(process.env.SEND_GRID_API_KEY)

   const msg ={
    to : options.to,
    from :{
        name :"Skill marketplace ",
        email : process.env.FROM
    },
    subject : options.subject,
    html : options.html,
    replyTo : options.replyTo
   };

   try {
    await sgmail.send(msg);
    console.log("Mail sent succesfully");
   } catch (error) {
    console.error('Error sending production email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
   }
}

export default sendMail;