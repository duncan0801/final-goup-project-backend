"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
// login
router.route("/login").post(controller_1.loginUser);
router.route("/logout").get(controller_1.logoutUser);
router.route("/validate-token").get(controller_1.validateLoggedInToken);
// logout??
exports.default = router;
