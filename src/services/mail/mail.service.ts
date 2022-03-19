import * as EmailTemplates from 'email-templates';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

import { ActionEnum } from '../../constants';
import { config } from '../../config';
import { htmlTemplates } from '../../email-templates';
import { ErrorHandler } from '../../errors';

const contextExtension = {
  frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD
  }
});

const emailTemplates = new EmailTemplates({
  message: {},
  views: {
    root: path.resolve((global as any).appRoot, 'email-templates', 'templates')
  }
});

export class MailService {
  async sendMail(email: string, action: ActionEnum, context: any = {}) {
    const templateInfo = htmlTemplates[action];

    if (!templateInfo) {
      throw new ErrorHandler(500, 'Email template not found');
    }

    Object.assign(context, contextExtension);

    const html = await emailTemplates.render(templateInfo.templateFileName, context);

    const mailOption = {
      from: `NO REPLY <${config.ROOT_EMAIL}>`,
      to: email,
      subject: templateInfo.subject,
      html
    };

    await transporter.sendMail(mailOption);
  }
}

export const mailService = new MailService();
