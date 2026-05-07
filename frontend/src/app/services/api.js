const API_URL =
  "https://opensheet.elk.sh/1XrOpxyd38oz6w6MFEItgTNE_mYfw5LmGRo-8yYewuP4/1";

export async function getIncidents() {

  const response = await fetch(API_URL);

  const data = await response.json();

  return data.map((item) => ({
    ...item,
    incidents: Number(item.incidents || 1),
  }));

}

export async function createIncident(data) {

  const response = await fetch(
    "https://lucianogrc.app.n8n.cloud/webhook/pulse-report",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();

}