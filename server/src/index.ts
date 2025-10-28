
const cors = require( 'cors');
import express, { Request, Response } from 'express';
import mediaRoutes from "./routes/mediaRoutes"
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

app.use("/api/media", mediaRoutes);
app.get("/", (req, res) => res.send("Favorite Media API"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});