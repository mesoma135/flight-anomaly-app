import { Router } from "express";
import { fetchAllStates, fetchStateById } from "../controllers/openSkyAPIController";

const router = Router();

router.get("/states", fetchAllStates);
router.get("/states/:icao24", fetchStateById);

export default router;
