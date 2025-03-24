"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import type { Car } from "../types"
import {
  Calendar,
  MapPin,
  DollarSign,
  Shield,
  CarIcon,
  ChevronDown,
  ChevronUp,
  Fuel,
  Settings,
  Users,
  Gauge,
  Check,
  Wifi,
  Music,
  Navigation,
  Bluetooth,
  Coffee,
  Wind,
  Smartphone,
  Radio,
  Star,
} from "lucide-react"
import DatePicker from "react-datepicker"
import toast from "react-hot-toast"

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [pickupDate, setPickupDate] = useState<Date>(new Date())
  const [returnDate, setReturnDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 3)))
  const [openSection, setOpenSection] = useState<string>("features")
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [activeImage, setActiveImage] = useState<string>("")

  // Additional car images based on type
  const additionalImages = {
    SUV: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80",
    Luxury: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80",
    Sports: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80",
    Compact: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
    Sedan: "https://images.unsplash.com/photo-1617654112368-307921291f42?auto=format&fit=crop&q=80",
  }

  useEffect(() => {
    fetchCarDetails()
  }, [id])

  useEffect(() => {
    if (car) {
      setActiveImage(car.image_url)
      calculateTotalPrice()
    }
  }, [car, pickupDate, returnDate])

  const calculateTotalPrice = () => {
    if (!car) return
    const days = Math.max(1, Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)))
    setTotalPrice(days * car.price)
  }

  const fetchCarDetails = async () => {
    try {
      const { data, error } = await supabase.from("cars").select("*").eq("id", id).single()

      if (error) throw error
      setCar(data)
    } catch (error: any) {
      toast.error("Failed to fetch car details")
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast.error("Please login to book a car")
        navigate("/login")
        return
      }

      const days = Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))

      const { error } = await supabase.from("bookings").insert([
        {
          car_id: id,
          user_id: user.id,
          pickup_date: pickupDate.toISOString(),
          return_date: returnDate.toISOString(),
          total_price: totalPrice,
        },
      ])

      if (error) throw error

      toast.success("Booking confirmed!")
      navigate("/bookings")
    } catch (error: any) {
      toast.error("Failed to create booking")
    }
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <CarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Car not found</h2>
          <p className="text-gray-600 mb-6">The car you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Return to home
          </button>
        </div>
      </div>
    )
  }

  const carFeatures = {
    features: [
      {
        icon: <Settings className="h-5 w-5 text-blue-500" />,
        label: "Automatic Transmission",
        description: "Smooth automatic transmission for effortless driving",
      },
      {
        icon: <Users className="h-5 w-5 text-blue-500" />,
        label: "5 Seats",
        description: "Comfortable seating for up to 5 passengers",
      },
      {
        icon: <Fuel className="h-5 w-5 text-blue-500" />,
        label: "Fuel Efficient",
        description: "Excellent fuel economy for longer journeys",
      },
      {
        icon: <Wind className="h-5 w-5 text-blue-500" />,
        label: "Climate Control",
        description: "Dual-zone automatic climate control",
      },
      {
        icon: <Gauge className="h-5 w-5 text-blue-500" />,
        label: "Cruise Control",
        description: "Advanced cruise control system",
      },
      {
        icon: <Navigation className="h-5 w-5 text-blue-500" />,
        label: "GPS Navigation",
        description: "Built-in GPS navigation system",
      },
      {
        icon: <Bluetooth className="h-5 w-5 text-blue-500" />,
        label: "Bluetooth",
        description: "Wireless connectivity for your devices",
      },
      {
        icon: <Music className="h-5 w-5 text-blue-500" />,
        label: "Premium Audio",
        description: "High-quality sound system",
      },
    ],
    comfort: [
      {
        icon: <Coffee className="h-5 w-5 text-green-500" />,
        label: "Cup Holders",
        description: "Convenient cup holders throughout",
      },
      {
        icon: <Smartphone className="h-5 w-5 text-green-500" />,
        label: "USB Ports",
        description: "Multiple USB charging ports",
      },
      {
        icon: <Wifi className="h-5 w-5 text-green-500" />,
        label: "Wi-Fi Hotspot",
        description: "Built-in Wi-Fi connectivity",
      },
      {
        icon: <Radio className="h-5 w-5 text-green-500" />,
        label: "Satellite Radio",
        description: "Access to satellite radio stations",
      },
    ],
    safety: [
      {
        icon: <Shield className="h-5 w-5 text-red-500" />,
        label: "Advanced Safety",
        description: "Comprehensive safety features",
      },
      {
        icon: <Check className="h-5 w-5 text-red-500" />,
        label: "ABS Braking",
        description: "Anti-lock braking system",
      },
      {
        icon: <Check className="h-5 w-5 text-red-500" />,
        label: "Multiple Airbags",
        description: "Front and side airbag protection",
      },
      {
        icon: <Check className="h-5 w-5 text-red-500" />,
        label: "Parking Assist",
        description: "Front and rear parking sensors",
      },
      {
        icon: <Check className="h-5 w-5 text-red-500" />,
        label: "Backup Camera",
        description: "High-resolution backup camera",
      },
      {
        icon: <Check className="h-5 w-5 text-red-500" />,
        label: "Lane Assist",
        description: "Lane departure warning system",
      },
    ],
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <button onClick={() => navigate("/")} className="hover:text-blue-600">
            Home
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{car.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Left column - Car images */}
            <div className="lg:w-3/5 p-6">
              <div className="relative rounded-xl overflow-hidden h-80 mb-4">
                <img src={activeImage || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  4.9/5
                </div>
              </div>
            </div>

            {/* Right column - Car details */}
            <div className="lg:w-2/5 p-6 lg:border-l border-gray-100">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
                <div className="flex flex-col items-end">
                  <span className="flex items-center text-2xl font-semibold text-blue-600">
                    <DollarSign className="h-6 w-6" />
                    {car.price}
                  </span>
                  <span className="text-sm text-gray-500">per day</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800">
                  <CarIcon className="h-4 w-4 mr-1" />
                  {car.type}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-800">
                  <MapPin className="h-4 w-4 mr-1" />
                  {car.location}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-800">
                  <Shield className="h-4 w-4 mr-1" />
                  Insurance Included
                </span>
              </div>

              <p className="mt-4 text-gray-600 leading-relaxed">{car.description}</p>

              {/* Booking section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book this car</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                    <div className="relative">
                      <DatePicker
                        selected={pickupDate}
                        onChange={(date: Date) => {
                          setPickupDate(date)
                          // Ensure return date is after pickup date
                          if (date >= returnDate) {
                            const newReturnDate = new Date(date)
                            newReturnDate.setDate(date.getDate() + 3)
                            setReturnDate(newReturnDate)
                          }
                        }}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                        minDate={new Date()}
                        dateFormat="MMM d, yyyy"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                    <div className="relative">
                      <DatePicker
                        selected={returnDate}
                        onChange={(date: Date) => setReturnDate(date)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                        minDate={new Date(pickupDate.getTime() + 86400000)} // +1 day from pickup
                        dateFormat="MMM d, yyyy"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-b border-gray-200 my-4">
                  <div className="text-gray-600">
                    <div className="font-medium">
                      {formatDate(pickupDate)} — {formatDate(returnDate)}
                    </div>
                    <div className="text-sm">
                      {Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 text-sm">Total Price</div>
                    <div className="text-2xl font-bold text-blue-600">${totalPrice}</div>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="border-t border-gray-100 px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Car Specifications</h2>

            <div className="space-y-4">
              <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white"
                  onClick={() => toggleSection("features")}
                >
                  <span className="text-lg font-semibold text-blue-900 flex items-center">
                    <CarIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Key Features
                  </span>
                  {openSection === "features" ? (
                    <ChevronUp className="h-5 w-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-500" />
                  )}
                </button>
                {openSection === "features" && (
                  <div className="px-6 py-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {carFeatures.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 group">
                          <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                            {feature.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{feature.label}</p>
                            <p className="text-sm text-gray-500">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-green-50 to-white"
                  onClick={() => toggleSection("comfort")}
                >
                  <span className="text-lg font-semibold text-green-900 flex items-center">
                    <Coffee className="h-5 w-5 mr-2 text-green-600" />
                    Comfort & Convenience
                  </span>
                  {openSection === "comfort" ? (
                    <ChevronUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-500" />
                  )}
                </button>
                {openSection === "comfort" && (
                  <div className="px-6 py-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {carFeatures.comfort.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 group">
                          <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                            {feature.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{feature.label}</p>
                            <p className="text-sm text-gray-500">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-red-50 to-white"
                  onClick={() => toggleSection("safety")}
                >
                  <span className="text-lg font-semibold text-red-900 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-600" />
                    Safety Features
                  </span>
                  {openSection === "safety" ? (
                    <ChevronUp className="h-5 w-5 text-red-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-red-500" />
                  )}
                </button>
                {openSection === "safety" && (
                  <div className="px-6 py-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {carFeatures.safety.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 group">
                          <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                            {feature.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{feature.label}</p>
                            <p className="text-sm text-gray-500">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

