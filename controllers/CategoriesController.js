import Category from '../models/Category.js';

class CategoriesController {
    static async getAllCategories(req, res) {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async createCategory(req, res) {
        const { category_name } = req.body;
        const image = req.file ? req.file.path : null;

        try {
            const category = new Category({ category_name, image });
            const newCategory = await category.save();
            res.status(201).json(newCategory);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async getCategoryById(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async updateCategory(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const { category_name } = req.body;
            if (category_name !== undefined) category.category_name = category_name;

            category.updated_at = Date.now();

            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.remove();
            res.json({ message: 'Category deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default CategoriesController;