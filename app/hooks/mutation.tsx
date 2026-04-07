import { fetchApi } from "../libs/helper";
import { ArtikelResponse, DetailArtikelResponse } from "../types/artikel";
import { ProfilesResponse } from "../types/profiles";
import { TestimoniResponse } from "../types/testimoni";

export async function getProfiles(): Promise<ProfilesResponse> {
  return fetchApi("/profiles?populate=*");
}

export async function getTestimoni(): Promise<TestimoniResponse> {
  return fetchApi("/testimonials");
}

export async function getArtikel(): Promise<ArtikelResponse> {
  return fetchApi("/articles?populate=*");
}

export async function getDetailArtikel(
  id: number,
): Promise<DetailArtikelResponse> {
  return fetchApi(`/articles/${id}?populate=*`);
}

export async function postComment(data: {
  nama: string;
  email: string;
  aspirasi: string;
  nomor_whatsapp: string;
}) {
  return fetchApi("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
