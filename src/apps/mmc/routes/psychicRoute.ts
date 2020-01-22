import {Router}                      from 'express';
import container                     from '../config/dependency-injection';
import {CheckAuthentication}         from '../../../contexts/shared/application/CheckAuthentication';
import {PsychicGetController}        from '../controllers/psychic/PsychicGetController';
import {PsychicCreateController}     from '../controllers/psychic/PsychicCreateController';
import {PsychicEditController}       from '../controllers/psychic/PsychicEditController';
import {PsychicDeactivateController} from '../controllers/psychic/PsychicDeactivateController';

const router                                                   = Router();
const psychicCreateController: PsychicCreateController         = container.get('Apps.mmc.controllers.psychic.PsychicCreateController');
const psychicGetController: PsychicGetController               = container.get('Apps.mmc.controllers.psychic.PsychicGetController');
const psychicEditController: PsychicEditController             = container.get('Apps.mmc.controllers.psychic.PsychicEditController');
const psychicDeactivateController: PsychicDeactivateController = container.get('Apps.mmc.controllers.psychic.PsychicDeactivateController');

router
    .post(
        '/',
        psychicCreateController.run.bind(psychicCreateController)
    );

router
    .get(
        '/:id',
        CheckAuthentication,
        psychicGetController.run.bind(psychicGetController)
    )
    .patch(
        '/:id',
        CheckAuthentication,
        psychicEditController.run.bind(psychicEditController)
    );

router
    .patch(
        '/:id/deactivate',
        CheckAuthentication,
        psychicDeactivateController.run.bind(psychicDeactivateController)
    );

export default router;
