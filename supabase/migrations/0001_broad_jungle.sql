/*
  # Create locations table for Kenya counties

  1. New Tables
    - `locations`
      - `id` (uuid, primary key)
      - `name` (text, county name)
      - `latitude` (decimal, location latitude)
      - `longitude` (decimal, location longitude)
      - `season` (text, best travel season)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `locations` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  latitude decimal(9,6) NOT NULL,
  longitude decimal(9,6) NOT NULL,
  season text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON locations
  FOR SELECT
  TO public
  USING (true);

-- Insert data for all 47 counties in Kenya
INSERT INTO locations (name, latitude, longitude, season) VALUES
  ('Nairobi', -1.286389, 36.817223, 'June to October (Dry Season)'),
  ('Mombasa', -4.043740, 39.658871, 'July to September (Cool & Dry)'),
  ('Kisumu', -0.091702, 34.767956, 'December to February (Dry Season)'),
  ('Nakuru', -0.303099, 36.080026, 'June to October (Dry Season)'),
  ('Eldoret', 0.514277, 35.269779, 'December to March (Dry Season)'),
  ('Machakos', -1.518333, 37.261944, 'June to October (Cool & Dry)'),
  ('Kisii', -0.681478, 34.770067, 'December to February (Dry Season)'),
  ('Thika', -1.039444, 37.069444, 'June to September (Dry Season)'),
  ('Malindi', -3.213333, 40.119167, 'August to October (Less Humid)'),
  ('Garissa', -0.453333, 39.641111, 'June to September (Cool Season)')
ON CONFLICT DO NOTHING;