import catchAsync from '@/utils/catchAsync';
import express from 'express';

const router = express.Router();
router.route('/').get(
  catchAsync(async (req, res) => {
    return res.send(200).json({
      ok: true,
    });
  })
);

export default router;
