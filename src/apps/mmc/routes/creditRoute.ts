import {Router}                 from 'express';
import container                from '../config/dependency-injection';
import {CheckAuthentication}    from '../../../contexts/shared/application/CheckAuthentication';
import {CreditCreateController} from '../controllers/credit/CreditCreateController';
import {CheckRole}              from '../../../contexts/shared/application/CheckRole';

const router                                         = Router();
const creditCreateController: CreditCreateController = container.get('Apps.mmc.controllers.credit.CreditCreateController');

router
    .post(
        '/',
        CheckAuthentication,
        CheckRole['ADMIN'],
        creditCreateController.run.bind(creditCreateController)
    );

export default router;
