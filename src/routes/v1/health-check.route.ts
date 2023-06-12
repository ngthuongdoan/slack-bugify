import catchAsync from '@/utils/catchAsync';
import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
  res.send(200).json({
    ok: true,
  });
});

export default router;
