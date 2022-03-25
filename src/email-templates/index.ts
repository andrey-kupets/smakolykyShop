import { ActionEnum } from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
  [ActionEnum.USER_REGISTER]: {
    subject: 'Congratulations',
    templateFileName: 'userWelcome'
  },
  [ActionEnum.FORGOT_PASSWORD]: {
    subject: 'We sympathize',
    templateFileName: 'forgotPassword'
  }
};
