"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openSkyAPIController_1 = require("../controllers/openSkyAPIController");
const router = (0, express_1.Router)();
router.get("/states", openSkyAPIController_1.fetchAllStates);
exports.default = router;
//# sourceMappingURL=openSkyAPIRoutes.js.map