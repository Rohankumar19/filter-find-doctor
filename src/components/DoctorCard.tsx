
import { Doctor } from '../types/doctor';
import { MapPin } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border p-4 mb-4 hover:shadow-md transition-shadow"
      data-testid="doctor-card"
    >
      <div className="flex flex-col md:flex-row">
        {/* Doctor Image and Basic Info */}
        <div className="flex items-start space-x-4 mb-4 md:mb-0 md:w-2/3">
          <div className="flex-shrink-0">
            <img
              src={doctor.image || "/placeholder.svg"}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-blue-800" data-testid="doctor-name">
              {doctor.name}
            </h2>
            
            <p className="text-gray-700 mb-2" data-testid="doctor-specialty">
              {doctor.specialty.join(', ')}
            </p>
            
            <p className="text-gray-600 mb-2" data-testid="doctor-experience">
              {doctor.experience} yrs exp
            </p>
            
            {doctor.qualification && (
              <p className="text-sm text-gray-500 mb-3">
                {doctor.qualification.join(', ')}
              </p>
            )}
            
            {/* Clinic and Location */}
            {(doctor.clinic || doctor.location) && (
              <div className="flex items-center text-sm text-gray-500">
                {doctor.clinic && (
                  <span className="mr-3">{doctor.clinic}</span>
                )}
                
                {doctor.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{doctor.location}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Fee and Booking */}
        <div className="flex flex-col items-end justify-between md:w-1/3">
          <div className="text-xl font-bold text-right text-gray-800" data-testid="doctor-fee">
            ₹{doctor.fee}
          </div>
          
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
