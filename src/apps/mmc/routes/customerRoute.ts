import {Router}                   from 'express';
import container                  from '../config/dependency-injection';
import {CustomerGetController}        from '../controllers/customer/CustomerGetController';
import {CustomerCreateController}     from '../controllers/customer/CustomerCreateController';
import {CustomerEditController}       from '../controllers/customer/CustomerEditController';
import {CustomerDeactivateController} from '../controllers/customer/CustomerDeactivateController';
import {checkAuthentication}                 from "../../../contexts/shared/middlewares/checkAuthentication";

const router                                             = Router();
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
        checkAuthentication,
        customerGetController.run.bind(customerGetController)
    )
    .patch(
        '/:id',
        checkAuthentication,
        customerEditController.run.bind(customerEditController)
    );

router
    .patch(
        '/:id/deactivate',
        checkAuthentication,
        customerDeactivateController.run.bind(customerDeactivateController)
    );

export default router;
