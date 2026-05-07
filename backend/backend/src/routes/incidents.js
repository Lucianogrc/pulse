import express from "express";
import incidents from "../data/incidents.js";

const router = express.Router();

/* GET INCIDENTS */
router.get("/", (req, res) => {
  res.json(incidents);
});

/* CREATE INCIDENT */
router.post("/", (req, res) => {
  const newIncident = {
    id: incidents.length + 1,
    ...req.body,
  };

  incidents.push(newIncident);

  res.status(201).json({
    message: "Incident created successfully",
    incident: newIncident,
  });
});

export default router;