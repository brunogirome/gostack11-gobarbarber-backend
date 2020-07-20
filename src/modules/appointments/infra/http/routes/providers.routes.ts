import { Router } from 'express';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRoute = Router();
const providersController = new ProvidersController();

providersRoute.use(ensureAthenticated);

providersRoute.get('/', providersController.index);

export default providersRoute;
