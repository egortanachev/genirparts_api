import express from 'express';
import CategoriesController from '../controllers/CategoriesController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', CategoriesController.getAllCategories);
router.post('/', adminMiddleware, upload.single('image'), CategoriesController.createCategory);
router.get('/:id', CategoriesController.getCategoryById);
router.put('/:id', adminMiddleware, CategoriesController.updateCategory);
router.delete('/:id', adminMiddleware, CategoriesController.deleteCategory);

export default router;