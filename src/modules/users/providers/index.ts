import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCrypitHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCrypitHashProvider);
