
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Doctor } from '../types/doctor';
import { ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  doctors: Doctor[];
}

const FilterPanel = ({ doctors }: FilterPanelProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // States for expanded sections
  const [specialtyExpanded, setSpecialtyExpanded] = useState(true);
  const [consultationExpanded, setConsultationExpanded] = useState(true);
  const [sortExpanded, setSortExpanded] = useState(true);
  
  // Get all unique specialties from doctors
  const allSpecialties = [...new Set(doctors.flatMap(doctor => doctor.specialty || []))].sort();
  
  // Current filter states
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);

  // Initialize filters from URL on component mount
  useEffect(() => {
    const consultType = searchParams.get('consultation');
    if (consultType) {
      setSelectedConsultation(consultType);
    }

    const specialties = searchParams.getAll('specialty');
    if (specialties.length > 0) {
      setSelectedSpecialties(specialties);
    }

    const sort = searchParams.get('sort');
    if (sort) {
      setSortBy(sort);
    }
  }, [searchParams]);

  // Update URL when filters change
  const updateFilters = (
    consultation: string | null,
    specialties: string[],
    sort: string | null
  ) => {
    const newParams = new URLSearchParams(searchParams);

    // Update consultation params
    if (consultation) {
      newParams.set('consultation', consultation);
    } else {
      newParams.delete('consultation');
    }

    // Update specialty params
    newParams.delete('specialty');
    specialties.forEach(specialty => {
      newParams.append('specialty', specialty);
    });

    // Update sort params
    if (sort) {
      newParams.set('sort', sort);
    } else {
      newParams.delete('sort');
    }

    navigate(`?${newParams.toString()}`);
  };

  // Handler for consultation type change
  const handleConsultationChange = (type: string) => {
    const newConsultation = selectedConsultation === type ? null : type;
    setSelectedConsultation(newConsultation);
    updateFilters(newConsultation, selectedSpecialties, sortBy);
  };

  // Handler for specialty selection
  const handleSpecialtyChange = (specialty: string) => {
    let newSpecialties: string[];
    
    if (selectedSpecialties.includes(specialty)) {
      newSpecialties = selectedSpecialties.filter(s => s !== specialty);
    } else {
      newSpecialties = [...selectedSpecialties, specialty];
    }
    
    setSelectedSpecialties(newSpecialties);
    updateFilters(selectedConsultation, newSpecialties, sortBy);
  };

  // Handler for sort option change
  const handleSortChange = (sort: string) => {
    const newSort = sortBy === sort ? null : sort;
    setSortBy(newSort);
    updateFilters(selectedConsultation, selectedSpecialties, newSort);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
      {/* Filter Header */}
      <div className="flex justify-between items-center pb-2 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      
      {/* Specialties */}
      <div>
        <div 
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => setSpecialtyExpanded(!specialtyExpanded)}
          data-testid="filter-header-speciality"
        >
          <h3 className="font-medium">Speciality</h3>
          <ChevronDown className={`h-5 w-5 transition-transform ${specialtyExpanded ? 'transform rotate-180' : ''}`} />
        </div>
        
        {specialtyExpanded && (
          <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
            {allSpecialties.map(specialty => (
              <div key={specialty} className="flex items-center">
                <input
                  type="checkbox"
                  id={`specialty-${specialty}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="h-4 w-4 text-blue-600 rounded"
                  data-testid={`filter-specialty-${specialty}`}
                />
                <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Consultation Mode */}
      <div>
        <div 
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => setConsultationExpanded(!consultationExpanded)}
          data-testid="filter-header-moc"
        >
          <h3 className="font-medium">Consultation Mode</h3>
          <ChevronDown className={`h-5 w-5 transition-transform ${consultationExpanded ? 'transform rotate-180' : ''}`} />
        </div>
        
        {consultationExpanded && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="video-consult"
                name="consultation"
                checked={selectedConsultation === 'Video Consult'}
                onChange={() => handleConsultationChange('Video Consult')}
                className="h-4 w-4 text-blue-600"
                data-testid="filter-video-consult"
              />
              <label htmlFor="video-consult" className="ml-2 text-sm">
                Video Consult
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="in-clinic"
                name="consultation"
                checked={selectedConsultation === 'In Clinic'}
                onChange={() => handleConsultationChange('In Clinic')}
                className="h-4 w-4 text-blue-600"
                data-testid="filter-in-clinic"
              />
              <label htmlFor="in-clinic" className="ml-2 text-sm">
                In Clinic
              </label>
            </div>
          </div>
        )}
      </div>
      
      {/* Sort By */}
      <div>
        <div 
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => setSortExpanded(!sortExpanded)}
          data-testid="filter-header-sort"
        >
          <h3 className="font-medium">Sort By</h3>
          <ChevronDown className={`h-5 w-5 transition-transform ${sortExpanded ? 'transform rotate-180' : ''}`} />
        </div>
        
        {sortExpanded && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="sort-fees"
                name="sort"
                checked={sortBy === 'fees'}
                onChange={() => handleSortChange('fees')}
                className="h-4 w-4 text-blue-600"
                data-testid="sort-fees"
              />
              <label htmlFor="sort-fees" className="ml-2 text-sm">
                Price: Low → High
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="sort-experience"
                name="sort"
                checked={sortBy === 'experience'}
                onChange={() => handleSortChange('experience')}
                className="h-4 w-4 text-blue-600"
                data-testid="sort-experience"
              />
              <label htmlFor="sort-experience" className="ml-2 text-sm">
                Experience: Most Experience first
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
