import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
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
        const info = await transporter.sendMail({
            from: `"Health Care Aide" <${process.env.EMAIL_USER}>`,
            to,
            subject, 
            text, 
            html,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
