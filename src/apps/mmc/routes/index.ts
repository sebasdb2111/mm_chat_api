import {Router} from 'express';
import auth     from './authRoute';
import user     from './userRoute';
import customer from './customerRoute';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/customers', customer);

export default routes;
