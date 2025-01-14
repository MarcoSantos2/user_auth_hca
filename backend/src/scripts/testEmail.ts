import { sendEmail } from '../utils/email/sendEmail';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

async function sendTestEmail(templateType: string, recipientEmail: string) {
    try {
        const templatePath = path.join(__dirname, '../utils/email/views', `${templateType}.ejs`);
        const template = fs.readFileSync(templatePath, 'utf8');

        const userData = {
            name: 'Julius Caesar',
            email: recipientEmail,
            action_url: 'https://example.com/next-step',
            support_email: 'aideconnect@zohomail.com',
            help_url: 'https://example.com/help'
        };

        const htmlContent = ejs.render(template, userData);

        await sendEmail(recipientEmail, 'Welcome to AideConnect', 'Welcome to AideConnect', htmlContent);
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
}

const [,, templateType, recipientEmail] = process.argv;

if (!templateType || !recipientEmail) {
    console.error('Usage: npm run send:test-email <templateType> <recipientEmail>');
    process.exit(1);
}

sendTestEmail(templateType, recipientEmail);


