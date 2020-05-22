import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointmetns = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const appointment = { id: uuid(), provider, date };

  appointmetns.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
