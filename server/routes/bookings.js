import express from 'express';
import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('car')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { car_id, pickup_date, return_date, total_price } = req.body;

    // Check if car exists and is available
    const car = await Car.findById(car_id);
    if (!car || !car.available) {
      return res.status(400).json({ message: 'Car not available' });
    }

    const booking = new Booking({
      user: req.user.userId,
      car: car_id,
      pickup_date,
      return_date,
      total_price,
      status: 'pending'
    });

    await booking.save();

    // Update car availability
    car.available = false;
    await car.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Make car available again
    await Car.findByIdAndUpdate(booking.car, { available: true });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;