import { Router } from "express";
import { fetchAllStates } from "../controllers/openSkyAPIController";

const router = Router();

router.get("/states", fetchAllStates);

export default router;
