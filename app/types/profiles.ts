export interface CarouselItem {
  imageCarousel: string;
}

export interface Education {
  school: string;
  location: string;
  startYear: number;
  endYear: number | string;
}

export interface Organization {
  organization: string;
  startYear: number;
  endYear: number | string;
}

export interface Experience {
  experience: string;
  startYear: number;
  endYear: number | string;
}

export interface ProfileData {
  name: string;
  position: string;
  imageProfile: string;
  carousel: CarouselItem[];
  topTagline: string;
  bottomTagline: string;
  description: string;
  biodata: string;
  vision: string;
  mission: string;
  education: Education[];
  organization: Organization[];
  experience: Experience[];
}

export interface ProfilesResponse {
  data: ProfileData;
}
