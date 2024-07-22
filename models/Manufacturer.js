import mongoose from 'mongoose';

const manufacturerSchema = new mongoose.Schema({
    manufacturer_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
export default Manufacturer;