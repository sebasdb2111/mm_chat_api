import {Router}                          from 'express';
import container                         from '../config/dependency-injection';
import {CheckAuthentication}             from '../../../contexts/shared/application/CheckAuthentication';
import {ChatSessionGetController}        from '../controllers/chatSession/ChatSessionGetController';
import {ChatSessionGetListController}    from '../controllers/chatSession/ChatSessionGetListController';
import {ChatSessionCreateController}     from '../controllers/chatSession/ChatSessionCreateController';
import {ChatSessionDeactivateController} from '../controllers/chatSession/ChatSessionDeactivateController';

const router                                                           = Router();
const chatSessionCreateController: ChatSessionCreateController         = container.get('Apps.mmc.controllers.chatSession.ChatSessionCreateController');
const chatSessionGetController: ChatSessionGetController               = container.get('Apps.mmc.controllers.chatSession.ChatSessionGetController');
const chatSessionGetListController: ChatSessionGetListController       = container.get('Apps.mmc.controllers.chatSession.ChatSessionGetListController');
const chatSessionDeactivateController: ChatSessionDeactivateController = container.get('Apps.mmc.controllers.chatSession.ChatSessionDeactivateController');

router
    .get(
		'/',
		CheckAuthentication,
		chatSessionGetListController.run.bind(chatSessionGetListController)
    )
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
