"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flightController_1 = require("../controllers/flightController");
const router = (0, express_1.Router)();
router.get("/historical", flightController_1.getHistoricalFlights);
router.get("/:id", flightController_1.getFlightbyId);
exports.default = router;
//# sourceMappingURL=flightRoutes.js.map