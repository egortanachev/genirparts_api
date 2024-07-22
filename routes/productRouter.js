import express from 'express';
import ProductController from '../controllers/ProductsController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', ProductController.prototype.getAllProducts);
router.get('/:id', ProductController.prototype.getProductById);
router.post('/', adminMiddleware, upload.single('image'), ProductController.createProduct);
router.put('/:id', adminMiddleware, ProductController.prototype.updateProduct);
router.delete('/:id', adminMiddleware, ProductController.prototype.deleteProduct);

router.get('/category/:categoryId', ProductController.prototype.getProductsByCategory);
router.get('/manufacturer/:manufacturerId', ProductController.prototype.getProductsByManufacturer);
router.get('/category/:categoryId/manufacturer/:manufacturerId', ProductController.prototype.getProductsByCategoryAndManufacturer);

router.post('/bulk', adminMiddleware, ProductController.bulkCreateProducts);

export default router;