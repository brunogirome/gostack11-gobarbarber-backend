import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeUsersRepository = new FakeUsersRepository();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
    );
  });

  it('should be able to reset de password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const updatedUser = await fakeUsersRepository.findById(user.id);

    await resetPassword.execute({ password: '111205', token });

    expect(updatedUser?.password).toBe('111205');
  });
});
