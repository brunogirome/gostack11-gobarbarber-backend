interface IMailConfig {
  driver: 'etherial' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'etherial',

  defaults: {
    from: {
      email: 'contact@brunogirome.com',
      name: 'Bruno Girome',
    },
  },
} as IMailConfig;
