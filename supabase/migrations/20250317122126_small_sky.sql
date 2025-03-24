/*
  # Initial Schema for Car Rental Platform

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `price` (numeric)
      - `location` (text)
      - `image_url` (text)
      - `available` (boolean)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `car_id` (uuid, references cars)
      - `pickup_date` (timestamp)
      - `return_date` (timestamp)
      - `total_price` (numeric)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create cars table
CREATE TABLE cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  price numeric NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  available boolean DEFAULT true,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  car_id uuid REFERENCES cars NOT NULL,
  pickup_date timestamptz NOT NULL,
  return_date timestamptz NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for cars table
CREATE POLICY "Anyone can view available cars"
  ON cars
  FOR SELECT
  USING (true);

-- Policies for bookings table
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample car data
INSERT INTO cars (name, type, price, location, image_url, description) VALUES
  ('Tesla Model 3', 'Luxury', 150, 'New York', 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80', 'Luxury electric vehicle with autopilot features'),
  ('Toyota RAV4', 'SUV', 80, 'Los Angeles', 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&q=80', 'Reliable SUV perfect for family trips'),
  ('BMW 3 Series', 'Sedan', 120, 'Miami', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80', 'Elegant sedan with premium features');