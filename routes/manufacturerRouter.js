import express from 'express';
import ManufacturersController from '../controllers/ManufacturersController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', ManufacturersController.getAllManufacturers);
router.post('/', adminMiddleware, upload.single('image'), ManufacturersController.createManufacturer);
router.get('/:id', ManufacturersController.getManufacturerById);
router.put('/:id', adminMiddleware, ManufacturersController.updateManufacturer);
router.delete('/:id', adminMiddleware, ManufacturersController.deleteManufacturer);

export default router;