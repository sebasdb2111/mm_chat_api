import {Router}           from 'express';
import auth               from './authRoute';
import chatSession        from './chatSessionRoute';
import chatSessionMessage from './chatSessionMessageRoute';
import credit             from './creditRoute';
import customer           from './customerRoute';
import psychic            from './psychicRoute';
import user               from './userRoute';

const routes = Router();

routes.use('/auth', auth);
routes.use('/chat-session', chatSession);
routes.use('/chat-session-message', chatSessionMessage);
routes.use('/credit', credit);
routes.use('/customer', customer);
routes.use('/psychic', psychic);
routes.use('/user', user);

export default routes;
