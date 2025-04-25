
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDoctors } from '../services/api';
import { Doctor } from '../types/doctor';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import DoctorCard from './DoctorCard';

const DoctorListingPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // Fetch doctors on component mount
  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        setError('Failed to fetch doctors. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, []);

  // Apply filters when doctors data or search params change
  useEffect(() => {
    if (!doctors.length) return;

    let filtered = [...doctors];
    
    // Apply name search filter
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply consultation type filter
    const consultationType = searchParams.get('consultation');
    if (consultationType) {
      filtered = filtered.filter(doctor => 
        doctor.consultationType.includes(consultationType)
      );
    }
    
    // Apply specialty filters
    const specialties = searchParams.getAll('specialty');
    if (specialties.length > 0) {
      filtered = filtered.filter(doctor => 
        doctor.specialty && specialties.some(specialty => doctor.specialty?.includes(specialty))
      );
    }
    
    // Apply sorting
    const sortBy = searchParams.get('sort');
    if (sortBy) {
      if (sortBy === 'fees') {
        filtered.sort((a, b) => a.fee - b.fee);
      } else if (sortBy === 'experience') {
        filtered.sort((a, b) => b.experience - a.experience);
      }
    }
    
    setFilteredDoctors(filtered);
  }, [doctors, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 py-4">
        <div className="container mx-auto px-4">
          <SearchBar doctors={doctors} />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Panel */}
          <div className="w-full md:w-1/4">
            <FilterPanel doctors={doctors} />
          </div>
          
          {/* Doctor List */}
          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
                No doctors match your search criteria. Try adjusting your filters.
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
                </h2>
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorListingPage;
