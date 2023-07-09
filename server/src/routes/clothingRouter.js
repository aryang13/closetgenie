import express from 'express';
import clothingController from '../controllers/clothingController.js';

const router = express.Router();

// GET /clothing
router.get('/', clothingController.getAllClothes);

// GET /clothing/favourites --- get all favourite clothing items
router.get('/favourites', clothingController.getFavouriteClothes);

// GET /clothing/type/:type
router.get('type/:type', clothingController.getClothesByType);

// GET /clothing/colour/
router.get('colour/:colour', clothingController.getClothesByColour);

// GET /clothing/type/:type/colour/:colour
router.get('type/:type/colour/:colour', clothingController.getClothesByTypeAndColour);

// POST /clothing
router.post('/', clothingController.postClothes);

// POST /clothing/favourites/:clothingId --- add clothing item to favourites
router.post('/favourites', clothingController.postFavouriteClothes);

// PATCH /clothing
router.patch('/', clothingController.patchClothing);

// DELETE /clothing
router.delete('/:clothingId', clothingController.deleteClothing);

// DELETE /clothing/favourites/:clothingId --- remove clothing item from favourites
router.delete('/favourites/:clothingId', clothingController.deleteFavouriteClothing);

export default router;