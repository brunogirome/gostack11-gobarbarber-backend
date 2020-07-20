import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;

let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const profile = await showProfileService.execute(id);

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should now be able to show a profile of an inexisting user', async () => {
    await expect(
      showProfileService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
