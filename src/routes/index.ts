import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

// route initialization
const router = Router();

// routes data
const routes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
];

// routes execution
routes.forEach(route => router.use(route.path, route.route));

export default router;
