import { Request, Response } from "express";
import dbClient from "../../utils/dbClient";

export const getAllFaqs = async (req: Request, res: Response) => {
  try {
    const faqs = await dbClient.faq.findMany();

    res.json({ data: faqs });
  } catch (error) {
    res.json({ error });
  }
};
