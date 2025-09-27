import Router from 'express';
import { verifyjwt } from '../middlewares/authMiddleware';
import {
    updateProviderProfile,
    getMyReviews,
    getMyOrders,
    updateJobStatus,
    blockedDates,
}  from '../Controllers/providerController.js';

const router = Router();


router.route('/update/providerprofile').put(verifyjwt , updateProviderProfile);
router.route('/getReviews').get(verifyjwt , getMyReviews);
router.route('/Orders').get(verifyjwt , getMyOrders);
router.route('/update/job/:jobId').put(verifyjwt , updateJobStatus);
router.route('/block/date').post(verifyjwt , blockedDates);

export default router;