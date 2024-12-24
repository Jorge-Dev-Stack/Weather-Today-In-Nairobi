/*
  # Create and populate locations table with Kenyan counties

  1. New Tables
    - `locations`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `latitude` (decimal)
      - `longitude` (decimal)
      - `season` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on locations table
    - Add policy for public read access

  3. Data
    - Add all 47 Kenyan counties with coordinates and best travel seasons
*/

-- Create the locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  latitude decimal(9,6) NOT NULL,
  longitude decimal(9,6) NOT NULL,
  season text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add unique constraint on name
CREATE UNIQUE INDEX IF NOT EXISTS locations_name_key ON locations (name);
ALTER TABLE locations ADD CONSTRAINT locations_name_unique UNIQUE USING INDEX locations_name_key;

-- Enable Row Level Security
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON locations
  FOR SELECT
  TO public
  USING (true);

-- Insert county data
INSERT INTO locations (name, latitude, longitude, season) VALUES
  ('Baringo', 0.4919, 35.7419, 'December to March (Dry Season)'),
  ('Bomet', -0.7868, 35.3416, 'December to March (Dry Season)'),
  ('Bungoma', 0.5700, 34.5600, 'December to February (Dry Season)'),
  ('Busia', 0.4608, 34.1117, 'December to February (Dry Season)'),
  ('Elgeyo Marakwet', 0.8031, 35.5081, 'December to March (Dry Season)'),
  ('Embu', -0.5389, 37.4597, 'July to September (Cool & Dry)'),
  ('Homa Bay', -0.5270, 34.4570, 'December to February (Dry Season)'),
  ('Isiolo', 0.3536, 37.5822, 'June to September (Dry Season)'),
  ('Kajiado', -1.8422, 36.7820, 'June to October (Cool & Dry)'),
  ('Kakamega', 0.2827, 34.7519, 'December to February (Dry Season)'),
  ('Kericho', -0.3689, 35.2863, 'December to March (Dry Season)'),
  ('Kiambu', -1.1748, 36.8304, 'June to September (Cool & Dry)'),
  ('Kilifi', -3.6305, 39.8499, 'July to September (Cool & Dry)'),
  ('Kirinyaga', -0.4988, 37.2898, 'July to September (Cool & Dry)'),
  ('Kitui', -1.3683, 38.0062, 'June to September (Cool & Dry)'),
  ('Kwale', -4.1814, 39.4619, 'July to September (Cool & Dry)'),
  ('Laikipia', 0.3997, 37.1566, 'December to March (Dry Season)'),
  ('Lamu', -2.2717, 40.9022, 'December to March (Less Humid)'),
  ('Makueni', -1.8041, 37.6267, 'June to October (Cool & Dry)'),
  ('Mandera', 3.9366, 41.8569, 'June to September (Cool Season)'),
  ('Marsabit', 2.3284, 37.9939, 'June to September (Cool Season)'),
  ('Meru', 0.0500, 37.6500, 'July to September (Cool & Dry)'),
  ('Migori', -1.0633, 34.4731, 'December to February (Dry Season)'),
  ('Murang''a', -0.7571, 37.1325, 'July to September (Cool & Dry)'),
  ('Nandi', 0.1871, 35.1755, 'December to March (Dry Season)'),
  ('Narok', -1.0921, 35.8668, 'June to October (Cool & Dry)'),
  ('Nyamira', -0.5641, 34.9363, 'December to February (Dry Season)'),
  ('Nyandarua', -0.1800, 36.3700, 'December to March (Dry Season)'),
  ('Nyeri', -0.4169, 36.9514, 'July to September (Cool & Dry)'),
  ('Samburu', 1.2175, 36.9375, 'June to September (Dry Season)'),
  ('Siaya', 0.0623, 34.2888, 'December to February (Dry Season)'),
  ('Taita Taveta', -3.3166, 38.4833, 'June to September (Cool & Dry)'),
  ('Tana River', -1.6493, 39.6566, 'June to September (Cool Season)'),
  ('Tharaka Nithi', -0.3073, 37.8891, 'July to September (Cool & Dry)'),
  ('Trans Nzoia', 1.0557, 34.9506, 'December to March (Dry Season)'),
  ('Turkana', 3.3123, 35.5686, 'June to September (Cool Season)'),
  ('Uasin Gishu', 0.5143, 35.2698, 'December to March (Dry Season)'),
  ('Vihiga', 0.0768, 34.7220, 'December to February (Dry Season)'),
  ('Wajir', 1.7471, 40.0573, 'June to September (Cool Season)'),
  ('West Pokot', 1.7319, 35.2016, 'December to March (Dry Season)')
ON CONFLICT (name) DO UPDATE 
SET 
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  season = EXCLUDED.season;