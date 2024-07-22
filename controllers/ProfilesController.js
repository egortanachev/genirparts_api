import Profile from '../models/Profile.js';

class ProfilesController {
    static async getProfile(req, res) {
        try {
            const { userId } = req.params;
            const profile = await Profile.findOne({ userId });
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            res.status(200).json(profile);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    static async updateProfile(req, res) {
        try {
            const { userId } = req.params;
            const { firstName, lastName } = req.body;
            const profile = await Profile.findOne({ userId });
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            profile.firstName = firstName || profile.firstName;
            profile.lastName = lastName || profile.lastName;
            await profile.save();
            res.status(200).json(profile);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export default ProfilesController;