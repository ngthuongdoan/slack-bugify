import express from 'express';
import botRoute from './bot.route';
import hrBotRoute from './hr-bot.route';

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
