import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

interface NoPasswordUser {
  password?: string;
}

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { user: responseUser, token } = await authenticateUser.execute({
    email,
    password,
  });

  const user: NoPasswordUser = { ...responseUser };

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
