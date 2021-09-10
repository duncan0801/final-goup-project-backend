"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoggedInToken = exports.logoutUser = exports.loginUser = void 0;
const service_1 = require("./service");
const authGenerator_1 = require("../../utils/authGenerator");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  Get user credentials
    const userCreds = req.body;
    try {
        // Check if credentials are valid
        const loggedUser = yield (0, service_1.findUserWithValidation)(userCreds);
        // handle result
        // Create token, this will be the user Passport
        const token = (0, authGenerator_1.createToken)({
            id: loggedUser.id,
            //   role: loggedUser.role,
        });
        // This creates a cookie that can't be accessed by Javascript in the Frontend
        // httpOnly: true
        res.cookie("token", token, { httpOnly: true });
        res.json({ data: { username: loggedUser.userName } });
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
exports.loginUser = loginUser;
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("token");
        res.json({ msg: "You've been succesfully logged out", data: null });
    });
}
exports.logoutUser = logoutUser;
function validateLoggedInToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        const tokenPayload = token && (0, authGenerator_1.validateToken)(token);
        if (tokenPayload) {
            const userData = yield (0, service_1.findUnique)({
                where: {
                    id: parseInt(tokenPayload.id),
                },
                select: {
                    userName: true,
                },
            });
            res.json({ data: userData });
        }
        else {
            res.status(401).json({ err: "No valid token was found" });
        }
    });
}
exports.validateLoggedInToken = validateLoggedInToken;
