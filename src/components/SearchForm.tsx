import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Search, Calendar, Car as CarIcon } from 'lucide-react';

interface SearchFormProps {
  onSearch: (params: {
    location: string;
    pickupDate: Date;
    dropDate: Date;
    carType: string;
    maxPrice: number;
  }) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [location, setLocation] = React.useState('');
  const [pickupDate, setPickupDate] = React.useState<Date>(new Date());
  const [dropDate, setDropDate] = React.useState<Date>(new Date());
  const [carType, setCarType] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState<number>(500);

  const ukLocations = [
    'London, UK',
    'Manchester, UK',
    'Edinburgh, UK',
    'Birmingham, UK',
    'Glasgow, UK',
    'Liverpool, UK'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, pickupDate, dropDate, carType, maxPrice });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 w-full p-2 border rounded-md appearance-none"
            >
              <option value="">Select location</option>
              {ukLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <DatePicker
              selected={pickupDate}
              onChange={(date: Date) => setPickupDate(date)}
              className="pl-10 w-full p-2 border rounded-md"
              minDate={new Date()}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <DatePicker
              selected={dropDate}
              onChange={(date: Date) => setDropDate(date)}
              className="pl-10 w-full p-2 border rounded-md"
              minDate={pickupDate}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
          <div className="relative">
            <CarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="pl-10 w-full p-2 border rounded-md"
            >
              <option value="">All Types</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Sports">Sports</option>
              <option value="Compact">Compact</option>
              <option value="Sedan">Sedan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">£</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="pl-8 w-full p-2 border rounded-md"
              min="0"
              max="1000"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Search Cars
      </button>
    </form>
  );
}