import express from 'express';
import laundryController from '../controllers/laundryController.js';

const router = express.Router();

// GET /laundry
router.get('/', laundryController.getAllLaundry);

// POST /laundry
router.post('/', laundryController.postLaundry);

// GET /laundry
router.delete('/', laundryController.deleteAllLaundry);

// DELETE /laundry/item
router.delete('/:clothingId', laundryController.deleteLaundryItem);

export default router;