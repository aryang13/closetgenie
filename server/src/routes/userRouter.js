import express from 'express';
import userController from '../controllers/userController.js';
import { checkIfAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// POST /user
router.post('/', userController.addUser);

// DELETE /user
router.delete('/', checkIfAuthenticated, userController.deleteUser);

// GET /temperature
router.get('/temperature', checkIfAuthenticated, userController.getTemperature);

// POST /temperature
router.patch('/temperature', checkIfAuthenticated, userController.changeTemperature);

// GET /stylePreferences
router.get('/style', checkIfAuthenticated, userController.getStylePreferences);

// POST /stylePreferences
router.patch('/style', checkIfAuthenticated, userController.changeStylePreference);

// DELETE /stylePreferences
router.delete('/styles/:styleId', checkIfAuthenticated, userController.removeStylePreference);

export default router;