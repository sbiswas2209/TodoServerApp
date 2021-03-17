const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const mailgun = require("mailgun-js")({
  apiKey: process.env.API_KEY,
  domain: "taskify.sagnikbiswas.tech",
});

function mailUser(email) {
  const data = {
    from: "Welcome!!! <auth@taskify.sagnikbiswas.tech>",
    to: `${email}`,
    subject: "Hello there!!!",
    text: "Organizing starts today!!!",
  };
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
}

module.exports = {
  mailUser: mailUser,
};
