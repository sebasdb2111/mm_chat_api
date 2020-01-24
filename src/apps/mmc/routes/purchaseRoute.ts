import {Router}                      from 'express';
import container                     from '../config/dependency-injection';
import {TransactionCreateController} from '../controllers/transaction/TransactionCreateController';

const router                                                   = Router();
const transactionCreateController: TransactionCreateController = container.get('Apps.mmc.controllers.transaction.TransactionCreateController');

router
    .post(
        '/',
        transactionCreateController.run.bind(transactionCreateController)
    );

export default router;
