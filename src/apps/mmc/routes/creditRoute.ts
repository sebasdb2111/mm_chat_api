import {Router}                 from 'express';
import container                from '../config/dependency-injection';
import {CheckAuthentication}    from '../../../contexts/shared/application/CheckAuthentication';
import {CreditSumGetController} from '../controllers/credit/CreditSumGetController';

const router                                         = Router();
const creditCreateController: CreditSumGetController = container.get('Apps.mmc.controllers.credit.CreditSumGetController');

router
    .get(
        '/sum-by-customer-and-psychic',
        CheckAuthentication,
        creditCreateController.run.bind(creditCreateController)
    );

export default router;
