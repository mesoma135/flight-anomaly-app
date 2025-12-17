"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anomalyController_1 = require("../controllers/anomalyController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', anomalyController_1.getAnomalyHistory);
exports.default = router;
//# sourceMappingURL=anomalyRoutes.js.map