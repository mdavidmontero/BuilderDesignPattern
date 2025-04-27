import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

type TransportConfig = {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
};
console.log(process.env.EMAIL_SERVICE);

const config = (): TransportConfig => {
  return {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET_KEY,
    },
  };
};

export const transport = nodemailer.createTransport(config());
