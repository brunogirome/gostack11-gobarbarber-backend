import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeHashProvider,
      fakeUsersRepository,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Mariana',
      email: 'mariana@example.com',
    });

    expect(updatedUser.name).toBe('Mariana');
    expect(updatedUser.email).toBe('mariana@example.com');
  });

  it('should now be able to update a profile of an inexisting user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'Mariana',
        email: 'mariana@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
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
      updateProfile.execute({
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

    const updatedUser = await updateProfile.execute({
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
      updateProfile.execute({
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
      updateProfile.execute({
        user_id: user.id,
        name: 'Mariana',
        email: 'mariana@example.com',
        old_password: 'wrong-old_password',
        password: '111205',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
