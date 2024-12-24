import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import type { Location } from '../lib/types';
import { useDebounce } from '../hooks/useDebounce';

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

export default function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const searchLocations = useCallback(async (term: string) => {
    if (!term || term.length < 2) {
      setLocations([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .ilike('name', `%${term}%`)
        .limit(5);

      if (error) {
        throw error;
      }

      setLocations(data || []);
    } catch (error) {
      console.error('Error searching locations:', error);
      toast.error('Failed to search locations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search when debounced value changes
  React.useEffect(() => {
    searchLocations(debouncedSearch);
  }, [debouncedSearch, searchLocations]);

  const handleSearch = () => {
    if (searchTerm.length < 2) {
      toast.error('Please enter at least 2 characters to search');
      return;
    }
    searchLocations(searchTerm);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a location..."
          className="w-full px-4 py-2 pl-10 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          disabled={loading || searchTerm.length < 2}
        >
          Search
        </button>
        <Search className={`absolute left-3 top-2.5 h-5 w-5 ${loading ? 'text-gray-400 animate-spin' : 'text-gray-400'}`} />
      </div>

      {locations.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-10">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => {
                onLocationSelect(location);
                setLocations([]);
                setSearchTerm(location.name);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {location.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}