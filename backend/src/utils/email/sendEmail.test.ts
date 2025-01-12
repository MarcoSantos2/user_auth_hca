import { sendEmail } from './sendEmail';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('sendEmail', () => {
  let mockSendMail: jest.Mock;

  beforeAll(() => {
    mockSendMail = jest.fn().mockResolvedValue({ messageId: '12345' });
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    });
  });

  it('should send an email successfully', async () => {
    const htmlTemplatePath = path.join(__dirname, 'views', 'emailConfirmation.ejs');
    const textTemplatePath = path.join(__dirname, 'views', 'emailConfirmation.ejs.txt');

    const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8');
    const textTemplate = fs.readFileSync(textTemplatePath, 'utf8');

    const userData = {
      name: 'Marco Santos',
      email: 'marco.inctva2@gmail.com',
      action_url: 'https://example.com/next-step',
      support_email: 'aideconnect@zohomail.com',
      help_url: 'https://example.com/help',
      type_of_action: 'email confirmation'
    };

    const htmlContent = ejs.render(htmlTemplate, userData);
    const textContent = ejs.render(textTemplate, userData);
    await sendEmail('marco.inctva2@gmail.com', 'Your email has been confirmed', textContent, htmlContent);
    expect(mockSendMail).toHaveBeenCalled();
  });
});

