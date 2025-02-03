import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';

dotenv.config();

export const sendEmail = async (to: string, subject: string, templateName: string, templateData: object) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false // When using localhost, we need to have this variable set to false
    },
  });

  try {
    // Define the path to the EJS template
    const templatePath = path.join(__dirname, 'views', `${templateName}.ejs`);

    // Render the EJS template with the provided data
    const html = await ejs.renderFile(templatePath, templateData);

    const info = await transporter.sendMail({
      from: `"Health Care Aide" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
