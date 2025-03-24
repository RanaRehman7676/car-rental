import React from 'react';
import { Car } from '../types';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onBook: (carId: string) => void;
}

export default function CarCard({ car, onBook }: CarCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={car.image_url}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{car.name}</h3>
          <span className="flex items-center text-green-600">
            <DollarSign className="h-4 w-4" />
            {car.price}/day
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {car.location}
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          Available Now
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">{car.description}</p>
        
        <button
          onClick={() => onBook(car.id)}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}