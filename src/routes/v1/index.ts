import express from 'express';

import bugifyRoute from './bugify.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/bugify',
    route: bugifyRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
