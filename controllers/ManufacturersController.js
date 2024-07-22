import Manufacturer from '../models/Manufacturer.js';

class ManufacturersController {
    static async getAllManufacturers(req, res) {
        try {
            const manufacturers = await Manufacturer.find();
            res.json(manufacturers);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async createManufacturer(req, res) {
        const { manufacturer_name, description } = req.body;
        const image = req.file ? req.file.path : null;

        try {
            const manufacturer = new Manufacturer({ manufacturer_name, description, image});
            const newManufacturer = await manufacturer.save();
            res.status(201).json(newManufacturer);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async getManufacturerById(req, res) {
        try {
            const manufacturer = await Manufacturer.findById(req.params.id);
            if (!manufacturer) {
                return res.status(404).json({ message: 'Manufacturer not found' });
            }
            res.json(manufacturer);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async updateManufacturer(req, res) {
        try {
            const manufacturer = await Manufacturer.findById(req.params.id);
            if (!manufacturer) {
                return res.status(404).json({ message: 'Manufacturer not found' });
            }

            if (req.body.manufacturer_name !== undefined) {
                manufacturer.manufacturer_name = req.body.manufacturer_name;
            }
            if (req.body.description !== undefined) {
                manufacturer.description = req.body.description;
            }
            manufacturer.updated_at = Date.now();

            const updatedManufacturer = await manufacturer.save();
            res.json(updatedManufacturer);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async deleteManufacturer(req, res) {
        try {
            const manufacturer = await Manufacturer.findById(req.params.id);
            if (!manufacturer) {
                return res.status(404).json({ message: 'Manufacturer not found' });
            }

            await manufacturer.remove();
            res.json({ message: 'Manufacturer deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default ManufacturersController;