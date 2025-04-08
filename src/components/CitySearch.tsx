import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
type CitySearchProps = {
  onSearch: (city: string) => void;
  onGetLocation: () => void;
};

// Common cities for autocomplete (simplified for demo)
const COMMON_CITIES = ["New York", "London", "Tokyo", "Paris", "Sydney", "Dubai", "Singapore", "Bangkok", "Mumbai", "Los Angeles", "Toronto", "Chicago"];
const CitySearch: React.FC<CitySearchProps> = ({
  onSearch,
  onGetLocation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Filter suggestions based on search term
    if (searchTerm.length >= 2) {
      const filteredCities = COMMON_CITIES.filter(city => city.toLowerCase().includes(searchTerm.toLowerCase()));
      setSuggestions(filteredCities);
      setShowSuggestions(filteredCities.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    // Handle clicks outside of suggestions dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };
  const handleSuggestionClick = (city: string) => {
    setSearchTerm(city);
    onSearch(city);
    setShowSuggestions(false);
  };
  return <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <Input ref={inputRef} type="text" placeholder="Search for a city..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pr-10 w-full" onFocus={() => setShowSuggestions(suggestions.length > 0)} />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          
          {showSuggestions && <div ref={suggestionsRef} className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map(city => <div key={city} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(city)}>
                  {city}
                </div>)}
            </div>}
        </div>
        
        <Button type="submit" variant="default" className="bg-weather-blue">
          Search
        </Button>
        
        
      </form>
    </div>;
};
export default CitySearch;