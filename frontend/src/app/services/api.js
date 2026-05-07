const SHEET_ID =
  "2PACX-1vQ6zPOJF2TuosYH7pgSF2CIFQ6hUTdtq4Q6YS6dhfYI0TTep-ZwwGkn8PleOLVlS9LVEsx5tVzh0TF_";

const SHEET_NAME = "Sheet1";

const SHEET_API = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

const WEBHOOK_URL =
  "https://lucianogrc.app.n8n.cloud/webhook/pulse-report";

export async function getIncidents() {

  const response = await fetch(SHEET_API);

  const data = await response.json();

  return data.map((item) => ({
    ...item,
    incidents: Number(item.incidents || 1),
  }));

}

export async function createIncident(data) {

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();

}