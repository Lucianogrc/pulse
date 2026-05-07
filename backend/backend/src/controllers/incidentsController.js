import fs from "fs";
import path from "path";

const filePath = path.resolve("data/incidents.json");

export const getIncidents = (req, res) => {
  const data = fs.readFileSync(filePath);
  const incidents = JSON.parse(data);

  res.json(incidents);
};

export const createIncident = (req, res) => {
  const data = fs.readFileSync(filePath);
  const incidents = JSON.parse(data);

  const newIncident = {
    id: Date.now(),
    ...req.body,
  };

  incidents.push(newIncident);

  fs.writeFileSync(
    filePath,
    JSON.stringify(incidents, null, 2)
  );

  res.status(201).json({
    message: "Incident created successfully",
    incident: newIncident,
  });
};