import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepositry from '@modules/users/repositories/IUserTokenRepository';
import IUsersRepositry from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRespotiory')
    private usersRepository: IUsersRepositry,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepositry,
  ) {}

  // public async execute({ email }: IRequest): Promise<void> {}
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Password recovery request');
  }
}

export default SendForgotPasswordEmailService;
