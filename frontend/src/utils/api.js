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
export const registerApi = async (username, password) => {
  const endpoint = `${API_URL_BASE}/auth/register`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed.");
  }

  return { success: true };
};

export const loginApi = async (username, password) => {
  const endpoint = `${API_URL_BASE}/auth/login`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid credentials.");
  }

  return await response.json();
};

export const getUrlDetailsApi = async (shortCode) => {
  const token = localStorage.getItem("jwt_token");
  const endpoint = `${API_URL_BASE}/urls/${shortCode}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("URL not found.");
    }
    throw new Error("API call failed with status:" + response.status);
  }
  return await response.json();
};
