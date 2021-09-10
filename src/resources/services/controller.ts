import { Request, Response } from "express";
import dbClient from "../../utils/dbClient";

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await dbClient.service.findMany();
    res.json({ data: services });
  } catch (error) {
    res.json({ error });
  }
};
