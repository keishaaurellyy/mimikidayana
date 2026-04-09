import { fetchApi } from "../libs/helper";
import { ArtikelResponse, DetailArtikelResponse } from "../types/artikel";
import { ProfilesResponse } from "../types/profiles";
import { TestimoniResponse } from "../types/testimoni";

export async function getProfiles(): Promise<ProfilesResponse> {
  return fetchApi("/profiles");
}

export async function getTestimoni(): Promise<TestimoniResponse> {
  return fetchApi("/testimonials");
}

export async function getArtikel(): Promise<ArtikelResponse> {
  return fetchApi("/articles");
}

export async function getDetailArtikel(
  id: number,
): Promise<DetailArtikelResponse> {
  return fetchApi(`/articles/${id}`);
}

export async function postComment(data: {
  name: string;
  email: string;
  aspiration: string;
  phoneNumber: string;
}) {
  return fetchApi("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
