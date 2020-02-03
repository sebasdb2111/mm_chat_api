import {Router}                      from 'express';
import container                     from '../config/dependency-injection';
// import {CheckAuthentication}         from '../../../contexts/shared/application/CheckAuthentication';
import {PsychicOfferListController}        from '../controllers/psychicOffer/PsychicOfferListController';

const router                                                   = Router();
const psychicOfferListController: PsychicOfferListController   = container.get('Apps.mmc.controllers.psychicOffer.PsychicOfferListController');

router
    .get(
        '/',
		psychicOfferListController.run.bind(psychicOfferListController)
    );

export default router;
