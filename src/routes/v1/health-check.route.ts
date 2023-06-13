import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
  res
    .json({
      ok: true,
    })
    .end();
});

export default router;
