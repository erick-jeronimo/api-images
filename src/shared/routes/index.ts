import { Router } from 'express';
import imagesRouter from '../../modules/images/routes/images.routes';
import usersRouter from '@modules/users/routes/users.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/images', imagesRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);

export default routes;
