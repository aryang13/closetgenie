import express from 'express';
import imageController from '../controllers/imageController.js';

const router = express.Router();

router.post('/', imageController.upload);

export default router;