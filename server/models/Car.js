import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['SUV', 'Luxury', 'Sports', 'Compact', 'Sedan']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Car', carSchema);