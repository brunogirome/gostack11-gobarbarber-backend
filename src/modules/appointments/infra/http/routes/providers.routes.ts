import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);
providersRoute.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);

export default providersRoute;
