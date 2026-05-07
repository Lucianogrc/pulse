const API_URL =
  "https://opensheet.elk.sh/1XrOpxyd38oz6w6MFEItgTNE_mYfw5LmGRo-8yYewuP4/Hoja%201";

export async function getIncidents() {

  const response = await fetch(API_URL);

  const data = await response.json();

  // FORMAT GOOGLE SHEETS DATA
  return data.map((item) => ({

    Date: item.Date || "",

    Match: item.Match || "",

    Country: item.Country || "",

    Category: item.Category || "",

    Severity: item.Severity || "",

    Description: item.Description || "",

    Name: item.Name || "",

    Email: item.Email || "",

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