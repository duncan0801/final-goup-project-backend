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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCounsellor = exports.addCounsellor = exports.getById = exports.getCounsellors = void 0;
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
const getCounsellors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const counsellors = yield dbClient_1.default.counsellor.findMany({
            include: {
                languages: true,
                specialties: true,
            },
        });
        res.json({ data: counsellors });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getCounsellors = getCounsellors;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const foundCounsellor = yield dbClient_1.default.counsellor.findUnique({
            where: {
                id,
            },
            include: {
                specialties: true,
                reviews: true,
            },
        });
        res.json({ data: foundCounsellor });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getById = getById;
const addCounsellor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCounsellor = req.body;
    try {
        const created = yield dbClient_1.default.counsellor.create({
            data: Object.assign({}, newCounsellor),
        });
        res.json({ data: created });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.addCounsellor = addCounsellor;
const updateCounsellor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const updateInfo = req.body;
    try {
        const existCounsellor = yield dbClient_1.default.counsellor.findUnique({
            where: {
                id,
            },
        });
        const updatedCounsellor = yield dbClient_1.default.counsellor.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign({}, existCounsellor), updateInfo),
        });
        res.json({ data: updatedCounsellor });
    }
    catch (error) {
        res.json({ error: `ID ${id} doesn't exict` });
    }
});
exports.updateCounsellor = updateCounsellor;
