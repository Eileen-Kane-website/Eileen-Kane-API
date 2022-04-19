const nodemailer = require('nodemailer');

const mailHost = process.env.EMAIL_HOST;
const mailPort = process.env.EMAIL_PORT;
const receiver = process.env.EMAIL_RECEIVER;
const userEmail = process.env.EMAIL_USER;
const password = process.env.EMAIL_USER_PASSWORD;

const sendMail = (reqBody) => {
  const {
    name,
    email,
    message,
    flag
  } = reqBody;
  const subject = `[ ${name} - ${email} ] has sent you a message`;
  const content = `name: ${name} \nemail: ${email} \n\nmessage: ${message} \n\n${flag}`;
  
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: userEmail,
      pass: password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.verify((error) => {
    if(error) console.log(error);
    else console.log('Server is ready to take our messages');
  });

  const mail = {
    subject,
    from: userEmail,
    to: receiver,
    text: content
  };

  const send = async(message) => {
    return await transporter.sendMail(message);
  }; 

  const mailerResponse = send(mail);

  return mailerResponse;
};

module.exports = {
  sendMail
};
