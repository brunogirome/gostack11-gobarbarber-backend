import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepositry from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRespotiory')
    private usersRepository: IUserRepositry,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  // public async execute({ email }: IRequest): Promise<void> {}
  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Password recovery request');
  }
}

export default SendForgotPasswordEmailService;
