import {Router}                       from 'express';
import container                      from '../config/dependency-injection';
import {CheckAuthentication}          from '../../../contexts/shared/application/CheckAuthentication';
import {CustomerGetController}        from '../controllers/customer/CustomerGetController';
import {CustomerCreateController}     from '../controllers/customer/CustomerCreateController';
import {CustomerEditController}       from '../controllers/customer/CustomerEditController';
import {CustomerDeactivateController} from '../controllers/customer/CustomerDeactivateController';

const router                                                     = Router();
const customerCreateController: CustomerCreateController         = container.get('Apps.mmc.controllers.customer.CustomerCreateController');
const customerGetController: CustomerGetController               = container.get('Apps.mmc.controllers.customer.CustomerGetController');
const customerEditController: CustomerEditController             = container.get('Apps.mmc.controllers.customer.CustomerEditController');
const customerDeactivateController: CustomerDeactivateController = container.get('Apps.mmc.controllers.customer.CustomerDeactivateController');

router
    .post(
        '/',
        customerCreateController.run.bind(customerCreateController)
    );

router
    .get(
        '/:id',
        CheckAuthentication,
        customerGetController.run.bind(customerGetController)
    )
    .patch(
        '/:id',
        CheckAuthentication,
        customerEditController.run.bind(customerEditController)
    );

router
    .patch(
        '/:id/deactivate',
        CheckAuthentication,
        customerDeactivateController.run.bind(customerDeactivateController)
    );

export default router;
