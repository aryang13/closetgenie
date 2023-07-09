import express from 'express';
import outfitController from '../controllers/outfitController.js';

const router = express.Router();

// GET /outfit
router.get('/', outfitController.getOutfit);

router.get('/get-all', outfitController.getAllOutfits);

// POST /outfit  --- help decide which outfit was selected
router.post('/', outfitController.postOutfit);

// GET /multiple
router.get('/multiple', outfitController.getMultipleOutfits);

export default router;

//TODO: 
//   - need to create a outfit collection in the database (DONE)
//   - keep track of the outfits that the user has selected, article of clothing, and the time it was chosen
//   - need to simple algorithm for now to determine which outfit is the best (can be colour and weather based)