const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'EMAIL_FROM@gmail.com', // generated the real user
    pass: 'PASSWORD' // generated the real password
  }
});

exports.sendEmailCF = functions.https.onRequest((req, res) => {
  console.log('Request ', req.body);
  return sendEmail(req.body).then(() => {
    return res.status(200).send(true);
  });
});

// Send email function
function sendEmail(body) {
  const mailOptions = {
    from: `<noreply@domain.com>`,
    to: body.email,
    subject: body.subject,
    html: ''
  };
  // hmtl message constructions
  mailOptions.html = `<p><b>Name: </b>${body.name}</p>
                      <p><b>Email: </b>${body.email}</p>
                      <p><b>Subject: </b>${body.subject}</p>
                      <p><b>Message: </b>${body.message}</p>`;
  return mailTransport.sendMail(mailOptions);
}
