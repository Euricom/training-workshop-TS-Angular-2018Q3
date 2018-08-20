import smtpTransport from './smtpTransport';
import repository from './repository';

const DEFAULT_FROM_ADDRESS = 'noreply@euri.com';

class MailSystem {
  public fromAddress: string;

  init(fromAddress = DEFAULT_FROM_ADDRESS) {
    this.fromAddress = fromAddress;
  }

  sendWelcomeMail(to, subject, model) {
    const body = `Hello ${model.name}, with this mail I...`;
    const mail = {
      subject,
      body,
      toAddress: to,
      fromAddress: this.fromAddress,
    };
    smtpTransport.send(mail);
  }

  transferMails(backend) {
    // get mail from db
    const mails = repository.getMails();

    // get filtered mails
    const filteredMails = mails.filter((mail) => mail.to.includes('euri.com'));

    // transfer to backend
    backend.transfer(filteredMails);
  }
}

export default new MailSystem();
