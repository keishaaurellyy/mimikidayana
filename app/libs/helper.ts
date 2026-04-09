export async function fetchApi(path: string, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", res.status, errorText);
    throw new Error(`Error: ${res.status} - ${errorText}`);
  }
  return res.json();
}

export function normalizeUrl(url: string) {
  return url?.replace(/([^:])\/\//g, "$1/");
}
