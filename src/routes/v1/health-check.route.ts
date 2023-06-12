import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
  res.sendStatus(200).json({
    ok: true,
  });
});

export default router;
