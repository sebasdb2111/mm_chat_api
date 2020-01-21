import {Router}                          from 'express';
import container                         from '../config/dependency-injection';
import {CheckAuthentication}             from '../../../contexts/shared/application/CheckAuthentication';
import {ChatSessionGetController}        from '../controllers/chatSession/ChatSessionGetController';
import {ChatSessionCreateController}     from '../controllers/chatSession/ChatSessionCreateController';
import {ChatSessionDeactivateController} from '../controllers/chatSession/ChatSessionDeactivateController';

const router                                                           = Router();
const chatSessionCreateController: ChatSessionCreateController         = container.get('Apps.mmc.controllers.chatSession.ChatSessionCreateController');
const chatSessionGetController: ChatSessionGetController               = container.get('Apps.mmc.controllers.chatSession.ChatSessionGetController');
const chatSessionDeactivateController: ChatSessionDeactivateController = container.get('Apps.mmc.controllers.chatSession.ChatSessionDeactivateController');

router
    .post(
        '/',
        CheckAuthentication,
        chatSessionCreateController.run.bind(chatSessionCreateController)
    );

router
    .get(
        '/:id',
        CheckAuthentication,
        chatSessionGetController.run.bind(chatSessionGetController)
    );

router
    .patch(
        '/:id/deactivate',
        CheckAuthentication,
        chatSessionDeactivateController.run.bind(chatSessionDeactivateController)
    );

export default router;
