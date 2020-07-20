import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Mariana',
      email: 'mariana@example.com',
    });

    expect(updatedUser.name).toBe('Mariana');
    expect(updatedUser.email).toBe('mariana@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Mariana',
      email: 'mariana@example.com',
      password: '1234567',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Mariana',
        email: 'mariana@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mariana',
      email: 'mariana@example.com',
      password: '1234567',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Mariana',
      email: 'mariana@example.com',
      old_password: '1234567',
      password: '111205',
    });

    expect(updatedUser.password).toBe('111205');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mariana',
      email: 'mariana@example.com',
      password: '1234567',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Mariana',
        email: 'mariana@example.com',
        password: '111205',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Mariana',
      email: 'mariana@example.com',
      password: '1234567',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Mariana',
        email: 'mariana@example.com',
        old_password: 'wrong-old_password',
        password: '111205',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
