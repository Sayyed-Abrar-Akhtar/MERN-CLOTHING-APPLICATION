import express from 'express';
const router = express.Router();
import { upload } from '../middleware/uploadMiddleware.js';

router.post('/', upload.single('image'), (req, res) => {
  console.log(`/${req.file.path}`);
  res.json({
    success: true,
    image: `${req.file.destination}${req.file.filename}`,
  });
});

router.post('/image', upload.single('image'), (req, res) => {
  console.log(`/${req.file.path}`);
  res.json({
    success: true,
    image: `/${req.file.path}`,
  });
});

export default router;
