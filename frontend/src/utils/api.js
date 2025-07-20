const API_URL_BASE = "https://localhost:7037/api";

export const shortenUrlApi = async (longUrl) => {
  const endpoint = `${API_URL_BASE}/urls`;
  const requestBody = { longUrl };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }
  return await response.json();
};
