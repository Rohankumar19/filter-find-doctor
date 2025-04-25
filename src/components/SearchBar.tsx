
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Doctor } from '../types/doctor';
import { Search } from 'lucide-react';

interface SearchBarProps {
  doctors: Doctor[];
}

const SearchBar = ({ doctors }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Set initial search value from URL if it exists
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredDoctors = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 3);

    setSuggestions(filteredDoctors);
  }, [searchQuery, doctors]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    setSearchQuery(doctor.name);
    setShowSuggestions(false);
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set('search', doctor.name);
    navigate(`?${newParams.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set('search', searchQuery);
    } else {
      newParams.delete('search');
    }
    
    navigate(`?${newParams.toString()}`);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search doctors by name"
            data-testid="autocomplete-input"
          />
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <button 
            type="submit" 
            className="absolute right-3 top-2.5 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white mt-1 border rounded-lg shadow-lg max-h-80 overflow-auto">
            {suggestions.map(doctor => (
              <div
                key={doctor.id}
                onClick={() => handleSuggestionClick(doctor)}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                data-testid="suggestion-item"
              >
                <div className="font-medium">{doctor.name}</div>
                <div className="text-sm text-gray-600">{doctor.specialty.join(', ')}</div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
