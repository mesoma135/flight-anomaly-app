import { Router } from "express";
import { getHistoricalFlights, getFlightbyId } from "../controllers/flightController";

const router = Router();

router.get("/historical", getHistoricalFlights);
router.get("/:id", getFlightbyId);

export default Router;

