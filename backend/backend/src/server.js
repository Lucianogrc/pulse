import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import incidentsRoutes from "./routes/incidents.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Pulse API Running",
  });
});

/* ROUTES */
app.use("/incidents", incidentsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});