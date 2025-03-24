import React, { useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CarCard from '../components/CarCard';
import { Car } from '../types';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Home() {
  const [cars, setCars] = React.useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true);

      if (error) throw error;

      setCars(data || []);
      setFilteredCars(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchParams: any) => {
    const filtered = cars.filter(car => {
      const matchesLocation = !searchParams.location || 
        car.location.toLowerCase().includes(searchParams.location.toLowerCase());
      const matchesType = !searchParams.carType || 
        car.type === searchParams.carType;
      const matchesPrice = !searchParams.maxPrice || 
        car.price <= searchParams.maxPrice;
      
      return matchesLocation && matchesType && matchesPrice;
    });
    
    setFilteredCars(filtered);
  };

  const handleBook = async (carId: string) => {
    navigate(`/car/${carId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="search-background py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Find Your Perfect Rental Car
          </h1>
          <p className="text-xl text-gray-200 mb-8 text-center">
            Explore our wide range of vehicles for any occasion
          </p>
          <div className="glass-effect rounded-xl p-6">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">No cars found matching your criteria</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search parameters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map(car => (
              <CarCard
                key={car.id}
                car={car}
                onBook={handleBook}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}