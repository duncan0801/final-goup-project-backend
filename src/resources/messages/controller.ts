import { User } from "@prisma/client";
import { Request, Response } from "express";
import dbClient from "../../utils/dbClient";


export const getMessagesByUserId = async (req: Request, res: Response) => {
	try {
		const messages = await dbClient.message.findMany({
			where: {
				user_ID: req.currentUserId,
			},
		});
		res.json({ data: messages });
	} catch (error) {
		res.json({ error });
	}
};
export const getMessagesByConversationId = async (
	req: Request,
	res: Response
) => {
	const conversation_ID = Number(req.params.id);
	try {
		const messages = await dbClient.message.findMany({
			where: {
				conversation_ID: conversation_ID,
			},
		});
		res.json({ data: messages });
	} catch (error) {
		res.json({ error });
	}
};

export const addMessage = async (req: Request, res: Response) => {
	const { date, content, user_ID, counsellor_ID, conversation_ID } = req.body;

	try {
		const createdMessage = await dbClient.message.create({
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
	} catch (error) {
		res.json({ error });
	}
};
export async function deleteMessage(req: Request, res: Response) {
	const id = Number(req.params.id);

	await dbClient.message.delete({
		where: {
			id: id,
		},
	});
}
