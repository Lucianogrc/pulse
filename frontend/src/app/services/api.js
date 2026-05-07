const API_URL = "http://localhost:5000";

export async function getIncidents() {
  const response = await fetch(`${API_URL}/incidents`);
  return response.json();
}

export async function createIncident(data) {
  const response = await fetch(`${API_URL}/incidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}