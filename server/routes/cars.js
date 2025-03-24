import express from 'express';
import Car from '../models/Car.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const { location, type, maxPrice } = req.query;
    let query = { available: true };

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (type) {
      query.type = type;
    }
    if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    const cars = await Car.find(query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;