/*
  # Add UK Cars

  1. Changes
    - Add new cars with UK locations
    - Update existing car data with more details

  2. Notes
    - Preserves existing data
    - Adds variety of UK locations
*/

INSERT INTO cars (name, type, price, location, image_url, description) VALUES
  ('Range Rover Sport', 'SUV', 200, 'London, UK', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80', 'Luxurious SUV perfect for city and countryside'),
  ('Mini Cooper S', 'Compact', 85, 'Manchester, UK', 'https://images.unsplash.com/photo-1617624085810-3df2165bd11b?auto=format&fit=crop&q=80', 'Classic British car, ideal for city driving'),
  ('Jaguar F-Type', 'Sports', 250, 'Edinburgh, UK', 'https://images.unsplash.com/photo-1588252303782-cb80119abd6c?auto=format&fit=crop&q=80', 'Powerful sports car with British elegance'),
  ('Aston Martin DB11', 'Luxury', 350, 'Birmingham, UK', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80', 'Ultimate luxury sports car experience'),
  ('Bentley Continental GT', 'Luxury', 400, 'Glasgow, UK', 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80', 'Premium luxury grand tourer'),
  ('Land Rover Defender', 'SUV', 180, 'Liverpool, UK', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80', 'Iconic British SUV with off-road capability');