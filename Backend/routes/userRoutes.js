import Router from 'express'
import {verifyjwt } from '../middlewares/authMiddleware.js';
import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    resetPassword,
    providerRequest,
    createReview,
    reviewForProvider
} from '../Controllers/userControllers.js'

const router = Router();

router.route('/register/user').post(registerUser);
router.route('/login/user').post(loginUser);
router.route('/getUser').get(verifyjwt , getCurrentUser);
router.route('/updateProfile').put(verifyjwt , updateProfile);
router.route('/resetpassword').put(verifyjwt , resetPassword);
router.route('/request/provider').post(verifyjwt , providerRequest);
router.route('/create/review/:providerId').post(verifyjwt , createReview);
router.route('/reviews/:providerId').get(verifyjwt , reviewForProvider);

export default router;








