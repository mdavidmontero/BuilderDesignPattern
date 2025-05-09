import { transport } from "../config/nodemailer";

type EmailType = {
  from: string;
  email: string;
  subject: string;
  body: string;
};

export class EmailSms {
  static sendConfirmationEmail = async (user: EmailType) => {
    await transport.sendMail({
      from: user.from,
      to: user.email,
      subject: user.subject,
      html: `${user.body}`,
    });
  };
}
