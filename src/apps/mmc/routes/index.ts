import {Router} from 'express';
import auth     from './authRoute';
import user     from './userRoute';
import customer from './customerRoute';
import psychic from './psychicRoute';
import chatSession from './chatSessionRoute';
import chatSessionMessage from './chatSessionMessageRoute';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/customer', customer);
routes.use('/psychic', psychic);
routes.use('/chat-session', chatSession);
routes.use('/chat-sessionMessage', chatSessionMessage);

export default routes;
