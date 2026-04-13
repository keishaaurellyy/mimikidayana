export interface CarouselItem {
  imageCarousel: string;
}

export interface Education {
  school: string;
  location: string;
  startYear: number | string;
  endYear: number | string;
}

export interface Organization {
  organization: string;
  startYear: number | string;
  endYear: number | string;
  image?: string;
}

export interface Experience {
  experience: string;
  startYear: number | string;
  endYear: number | string;
  image?: string;
}

export interface ProfileData {
  id?: number;
  name: string;
  position: string;
  imageProfile: string;
  topTagline: string;
  bottomTagline: string;
  description: string;
  biodata: string;
  vision: string;
  mission: string;
  carousel: CarouselItem[];
  education: Education[];
  organization: Organization[];
  experience: Experience[];
}

export interface Tag {
  tag: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: "news" | "achievement";
  publishedDate: string;
  image: string;
  description: string;
  tags: Tag[];
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  profileImage: string;
  review: string;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  aspiration: string;
  created_at: string;
}
