import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

interface NoPasswordUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    const responseUser: NoPasswordUser = { ...user };

    delete responseUser.password;

    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
