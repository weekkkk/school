const nodemailer = require('nodemailer');

/**
 * * Почтовый серсис
 */
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  /**
   * * Отправить ссылку для активацию пользователя 
   * @param to - почта, на которую отправить сообщение 
   * @param link - ссылка, которую нужно отправить
   */
  async sendActivationLink(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: '',
      html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
