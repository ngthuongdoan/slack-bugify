import express from 'express';

import bugifyRoute from './bugify.route';
import healthCheckRoute from './health-check.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/health-check',
    route: healthCheckRoute,
  },
  {
    path: '/bugify',
    route: bugifyRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
