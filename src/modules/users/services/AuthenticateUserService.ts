import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import authConfig from '@config/auth';

import IUserRepositry from '../repositories/IUsersRepository';

interface IRequest {
  email: 'string';
  password: 'string';
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUserRepositry) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email/passowrd.', 401);
    }

    const passowrdMatched = await compare(password, user.password);

    if (!passowrdMatched) {
      throw new AppError('Invalid email/passowrd.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
