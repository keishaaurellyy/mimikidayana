export interface Testimoni {
  id: number;
  name: string;
  position: string;
  profileImage: string;
  review: string;
}

export interface TestimoniResponse {
  data: Testimoni[];
}
