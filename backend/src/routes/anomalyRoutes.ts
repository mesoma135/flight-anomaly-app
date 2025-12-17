import { getAnomalyHistory } from "../controllers/anomalyController";
import { Router } from "express";

const router = Router();

router.get('/', getAnomalyHistory);

export default router;