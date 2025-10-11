import Router from 'express';
import { verifyjwt } from '../middlewares/authMiddleware.js';
import {isAdmin} from '../middlewares/isAdmin.js';
import {
     approveRequest,
    cancelRequest,
    getAllUsers,
    suspendUser,
    getReviewsforprovider,
}  from '../Controllers/AdminControllers.js'

const router = Router();

router.route('/approve/request/:providerId').post(verifyjwt , isAdmin , approveRequest);
router.route('/cancel/request/:providerId').post(verifyjwt ,isAdmin , cancelRequest);
router.route('/getAll').get(verifyjwt ,isAdmin , getAllUsers);
router.route('/suspend/:userId').put(verifyjwt , isAdmin , suspendUser);
router.route('/getReviews/:providerId').post(verifyjwt , isAdmin , getReviewsforprovider);

export default router;