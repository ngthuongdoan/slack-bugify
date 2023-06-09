import express from 'express';
import botRoute from './bot.route';
import hrBotRoute from './hr-bot.route';
import bugifyRoute from './bugify.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/bot',
    route: botRoute,
  },
  {
    path: '/hr-bot',
    route: hrBotRoute,
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
