export async function fetchApi(path: string, options = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}

export function normalizeUrl(url: string) {
  return url?.replace(/([^:])\/\//g, "$1/");
}
