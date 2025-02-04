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
    const templatePath = path.join(__dirname, 'views', `${templateName}.ejs`);

    // Add environment variables to the template data
    const dataWithEnv = {
      ...templateData,
      // Add other environment variables here
      product_name: process.env.PRODUCT_NAME,
      
    };

    // Render the EJS template with the provided data
    const html = await ejs.renderFile(templatePath, dataWithEnv);

    const info = await transporter.sendMail({
      from: `"${process.env.SENDER_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
