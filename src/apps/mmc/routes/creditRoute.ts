import {Router}                   from 'express';
import container                  from '../config/dependency-injection';
import {CheckAuthentication}      from '../../../contexts/shared/application/CheckAuthentication';
import {CustomerCreateController} from '../controllers/customer/CustomerCreateController';

const router                                             = Router();
const customerCreateController: CustomerCreateController = container.get('Apps.mmc.controllers.customer.CustomerCreateController');

router
    .post(
        '/',
        CheckAuthentication,
        customerCreateController.run.bind(customerCreateController)
    );

export default router;
