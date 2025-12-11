import express, { Application } from "express";
import cors from "cors";
import axios from "axios";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(axios);

export default app;
