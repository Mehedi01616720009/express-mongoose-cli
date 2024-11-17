import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = Router();

// signin route
router.post(
    '/signin',
    validateRequest(AuthValidations.signinValidationSchema),
    AuthControllers.signIn
);

// get me route
router.get('/me', auth(USER_ROLES.superAdmin), AuthControllers.getMe);

// get new access token route
router.get(
    '/access-token',
    validateRequest(AuthValidations.refreshTokenValidationSchema),
    AuthControllers.getNewAccessToken
);

// forget password route
router.post(
    '/forget-password',
    validateRequest(AuthValidations.forgetPasswordValidationSchema),
    AuthControllers.forgetPassword
);

// reset password route
router.post(
    '/reset-password',
    validateRequest(AuthValidations.resetPasswordValidationSchema),
    AuthControllers.resetPassword
);

export const AuthRoutes = router;
