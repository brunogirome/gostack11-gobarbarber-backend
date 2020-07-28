import { Router } from 'express';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailability from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailability from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

const providersRoute = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailability();
const providerDayAvailabilityController = new ProviderDayAvailability();

providersRoute.use(ensureAthenticated);

providersRoute.get('/', providersController.index);
providersRoute.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRoute.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRoute;
