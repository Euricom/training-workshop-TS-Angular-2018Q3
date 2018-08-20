import mailSystem from './mailSystem';

describe('mailSystem', () => {
  test.skip('sendWelcomeMail', () => {
    // arrange
    const to = '...';
    const subject = '...';
    const model = '...';

    // act
    mailSystem.sendWelcomeMail(to, subject, model);

    // assert
  });
});
