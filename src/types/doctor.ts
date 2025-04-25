
export interface Doctor {
  id: string;
  name: string;
  image?: string;
  specialty: string[];
  experience: number;
  fee: number;
  consultationType: string[];
  qualification: string[];
  clinic?: string;
  location?: string;
}
