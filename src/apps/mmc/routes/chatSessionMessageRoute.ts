import {Router}                             from 'express';
import container                            from '../config/dependency-injection';
import {CheckAuthentication}                from '../../../contexts/shared/application/CheckAuthentication';
import {ChatSessionMessageGetController}    from '../controllers/chatSessionMessage/ChatSessionMessageGetController';
import {ChatSessionMessageCreateController} from '../controllers/chatSessionMessage/ChatSessionMessageCreateController';
import {ChatSessionMessageDeleteController} from '../controllers/chatSessionMessage/ChatSessionMessageDeleteController';
import {ChatSessionConversationGetController} from '../controllers/chatSessionMessage/ChatSessionConversationGetController';

const router                                                                 = Router();
const chatSessionMessageCreateController: ChatSessionMessageCreateController = container.get(
    'Apps.mmc.controllers.chatSessionMessage.ChatSessionMessageCreateController'
);
const chatSessionMessageGetController: ChatSessionMessageGetController       = container.get(
    'Apps.mmc.controllers.chatSessionMessage.ChatSessionMessageGetController'
);
const chatSessionConversationGetController: ChatSessionConversationGetController = container.get(
    'Apps.mmc.controllers.chatSessionMessages.ChatSessionConversationGetController'
);
const chatSessionMessageDeleteController: ChatSessionMessageDeleteController = container.get(
    'Apps.mmc.controllers.chatSessionMessage.ChatSessionMessageDeleteController'
);

router
    .post(
        '/',
        CheckAuthentication,
        chatSessionMessageCreateController.run.bind(chatSessionMessageCreateController)
    );

router
    .get(
        '/:id',
        CheckAuthentication,
        chatSessionMessageGetController.run.bind(chatSessionMessageGetController)
    );

router
    .patch(
        '/:id/delete',
        CheckAuthentication,
        chatSessionMessageDeleteController.run.bind(chatSessionMessageDeleteController)
    );
router
	.get(
		'/by-chat-session/:id',
		CheckAuthentication,
		chatSessionConversationGetController.run.bind(chatSessionConversationGetController)
	);
export default router;
