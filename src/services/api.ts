
import { Doctor } from '../types/doctor';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Get the raw data
    const rawData = await response.json();
    
    // Transform the data to match our Doctor interface
    const formattedData = rawData.map((item: any) => {
      // Extract specialty from specialities array
      const specialty = item.specialities ? item.specialities.map((s: any) => s.name) : [];
      
      // Extract fees (remove the ₹ symbol and convert to number)
      const feeString = item.fees || "0";
      const fee = parseInt(feeString.replace(/[^\d]/g, ""));
      
      // Extract experience (convert "X Years of experience" to number)
      const experienceString = item.experience || "0 Years of experience";
      const experience = parseInt(experienceString.match(/\d+/) || "0");
      
      // Determine consultation types
      const consultationType = [];
      if (item.video_consult) consultationType.push("Video Consult");
      if (item.in_clinic) consultationType.push("In Clinic");
      
      return {
        id: item.id,
        name: item.name,
        image: item.photo,
        specialty: specialty,
        specialities: item.specialities,
        experience: experience,
        fee: fee,
        consultationType: consultationType,
        qualification: item.languages || [],
        clinic: item.clinic?.name,
        location: item.clinic?.address?.city,
      };
    });
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};
