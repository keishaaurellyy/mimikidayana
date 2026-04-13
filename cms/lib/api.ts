import type { Article, Comment, ProfileData, Testimonial } from "./types";

const getBase = () =>
  (typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL) || "http://localhost:3000";

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${getBase()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Profile ────────────────────────────────────────────────────────────────

export const getProfile = () =>
  request<{ data: ProfileData }>("/api/profiles");

export const updateProfile = (id: number, data: Partial<ProfileData>) =>
  request<{ data: ProfileData }>("/api/profiles", {
    method: "PUT",
    body: JSON.stringify({ id, ...data }),
  });

export const createProfile = (data: Partial<ProfileData>) =>
  request<{ data: ProfileData }>("/api/profiles", {
    method: "POST",
    body: JSON.stringify(data),
  });

// ─── Articles ────────────────────────────────────────────────────────────────

export const getArticles = (category?: "news" | "achievement") =>
  request<{ data: Article[] }>(
    `/api/articles${category ? `?category=${category}` : ""}`,
  );

export const getArticle = (id: number | string) =>
  request<{ data: Article }>(`/api/articles/${id}`);

export const createArticle = (data: Partial<Article>) =>
  request<{ data: Article }>("/api/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateArticle = (id: number, data: Partial<Article>) =>
  request<{ data: Article }>(`/api/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteArticle = (id: number) =>
  request<{ message: string }>(`/api/articles/${id}`, { method: "DELETE" });

// ─── Testimonials ────────────────────────────────────────────────────────────

export const getTestimonials = () =>
  request<{ data: Testimonial[] }>("/api/testimonials");

export const getTestimonial = (id: number) =>
  request<{ data: Testimonial }>(`/api/testimonials/${id}`);

export const createTestimonial = (data: Partial<Testimonial>) =>
  request<{ data: Testimonial }>("/api/testimonials", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateTestimonial = (id: number, data: Partial<Testimonial>) =>
  request<{ data: Testimonial }>(`/api/testimonials/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteTestimonial = (id: number) =>
  request<{ message: string }>(`/api/testimonials/${id}`, {
    method: "DELETE",
  });

// ─── Comments (Aspirasi) ─────────────────────────────────────────────────────

export const getComments = () =>
  request<{ data: Comment[] }>("/api/comments");

export const deleteComment = (id: number) =>
  request<{ message: string }>(`/api/comments/${id}`, { method: "DELETE" });
