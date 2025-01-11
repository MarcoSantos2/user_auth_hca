import { sendEmail } from './nodemailer';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const sendTestEmail = async () => {
  try {
    const templatePath = path.join(__dirname, 'templates', 'welcome.html');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Define data to replace in template - these variables need to match the ones in the HTML template
    const userData = {
      name: 'Julius Caesar',
      email: 'julius.caesar@test.com',
      action_url: 'https://example.com/next-step',
      support_email: 'aideconnect@zohomail.com',
      help_url: 'https://example.com/help'
    };

    const htmlContent = ejs.render(template, userData);

    await sendEmail('julius.caesar@test.com', 'Welcome to AideConnect', 'Welcome to AideConnect', htmlContent);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email:', error);
  }
};

sendTestEmail();
