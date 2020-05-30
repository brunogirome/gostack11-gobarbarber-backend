import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

interface NoPasswordUser {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const responseUser: NoPasswordUser = { ...user };

    delete responseUser.password;

    return res.json(responseUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default usersRouter;
