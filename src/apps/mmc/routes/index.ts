import {Router} from 'express';
import auth     from './authRoute';
import user     from './userRoute';
import customer from './customerRoute';
import psychic from './psychicRoute';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/customer', customer);
routes.use('/psychic', psychic);

export default routes;
