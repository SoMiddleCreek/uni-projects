import http from "http";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
app.server = http.createServer(app);
app.use(cors());

//define paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const statsData = path.join(__dirname, "data.json");

// Adding a default route at /
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

//get Data version 1
//app.use("/goto-mars/stats", express.static(statsData));

//get data version 2
app.get("/goto-mars/stats", (req, res) => {
  res.sendFile(statsData);
});

app.server.listen(3000, () => {
  console.log(`Started on port ${app.server.address().port}`);
});
