import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

