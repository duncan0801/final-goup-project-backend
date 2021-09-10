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
exports.deleteMessage = exports.addMessage = exports.getMessagesByConversationId = exports.getMessagesByUserId = void 0;
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
const getMessagesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield dbClient_1.default.message.findMany({
            where: {
                user_ID: req.currentUserId,
            },
        });
        res.json({ data: messages });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getMessagesByUserId = getMessagesByUserId;
const getMessagesByConversationId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conversation_ID = Number(req.params.id);
    try {
        const messages = yield dbClient_1.default.message.findMany({
            where: {
                conversation_ID: conversation_ID,
            },
        });
        res.json({ data: messages });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getMessagesByConversationId = getMessagesByConversationId;
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, content, user_ID, counsellor_ID, conversation_ID } = req.body;
    try {
        const createdMessage = yield dbClient_1.default.message.create({
            data: {
                date: date,
                content: content,
                user: {
                    connect: {
                        id: user_ID,
                    },
                },
                conversation: {
                    connect: {
                        id: conversation_ID,
                    },
                },
            },
        });
        res.json({ data: createdMessage });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.addMessage = addMessage;
function deleteMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        yield dbClient_1.default.message.delete({
            where: {
                id: id,
            },
        });
    });
}
exports.deleteMessage = deleteMessage;
