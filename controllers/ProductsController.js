import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Manufacturer from '../models/Manufacturer.js';

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.find().populate('manufacturer_id', 'manufacturer_name').populate('category_id', 'category_name');
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async createProduct(req, res) {
        const { name, article, description, price, quantity_in_stock, category_id, manufacturer_id } = req.body;
        const image = req.file ? req.file.path : null;

        try {
            const category = await Category.findById(category_id);
            if (!category) {
                return res.status(400).json({ message: 'Invalid category ID' });
            }
            
            const manufacturer = await Manufacturer.findById(manufacturer_id);
            if (!manufacturer) {
                return res.status(400).json({ message: 'Invalid manufacturer ID' });
            }

            const product = new Product({
                name,
                article,
                description,
                price,
                quantity_in_stock,
                category_id,
                manufacturer_id,
                image
            });

            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const { name, article, description, price, quantity_in_stock, category_id, manufacturer_id } = req.body;
        try {
            const product = await Product.findByIdAndUpdate(
                id,
                { name, article, description, price, quantity_in_stock, category_id, manufacturer_id },
                { new: true }
            );
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getProductsByCategory(req, res) {
        const { categoryId } = req.params;
        try {
            const products = await Product.find({ category_id: categoryId }).populate('category_id', 'category_name');
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getProductsByManufacturer(req, res) {
        const { manufacturerId } = req.params;
        try {
            const products = await Product.find({ manufacturer_id: manufacturerId }).populate('manufacturer_id', 'manufacturer_name');
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getProductsByCategoryAndManufacturer(req, res) {
        const { categoryId, manufacturerId } = req.params;
        try {
            const products = await Product.find({ category_id: categoryId, manufacturer_id: manufacturerId }).populate('category_id', 'category_name').populate('manufacturer_id', 'manufacturer_name');
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async bulkCreateProducts(req, res) {
        const products = req.body;

        try {
            for (const productData of products) {
                const { name, article, description, price, quantity_in_stock, category_id, manufacturer_id } = productData;

                const category = await Category.findById(category_id);
                if (!category) {
                    return res.status(400).json({ message: `Invalid category ID: ${category_id}` });
                }

                const manufacturer = await Manufacturer.findById(manufacturer_id);
                if (!manufacturer) {
                    return res.status(400).json({ message: `Invalid manufacturer ID: ${manufacturer_id}` });
                }

                const product = new Product({
                    name,
                    article,
                    description,
                    price,
                    quantity_in_stock,
                    category_id,
                    manufacturer_id,
                });

                await product.save();
            }

            res.status(201).json({ message: 'Products created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

export default ProductController;