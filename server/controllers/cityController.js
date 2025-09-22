import City from '../models/cityModel.js';

const cityController = {
  createCity: async (req, res) => {
    try {
      const city = new City({ name: req.body.name });
      await city.save();
      res.status(201).json(city);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllCities: async (req, res) => {
    try {
      const cities = await City.find();
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCityById: async (req, res) => {
    try {
      const city = await City.findById(req.params.id);
      if (!city) return res.status(404).json({ error: 'City not found' });
      res.status(200).json(city);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCity: async (req, res) => {
    try {
      const city = await City.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true, runValidators: true });
      if (!city) return res.status(404).json({ error: 'City not found' });
      res.status(200).json(city);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteCity: async (req, res) => {
    try {
      const city = await City.findByIdAndDelete(req.params.id);
      if (!city) return res.status(404).json({ error: 'City not found' });
      res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default cityController;