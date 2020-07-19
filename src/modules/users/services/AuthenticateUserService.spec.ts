import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUsers: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUsers = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to athenticate', async () => {
    const user = await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '111205',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '111205',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to athenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '111205',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to athenticate with wrong password', async () => {
    await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '111205',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'a-wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
