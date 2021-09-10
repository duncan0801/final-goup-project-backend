import { Request, Response } from "express";
import dbClient from "../../utils/dbClient";

export type NewCounsellor = {
  firstName: string;
  lastName: string;
  about: string;
  licensing: string;
  avatar: string;
  hourlyRate: number;
};

export const getCounsellors = async (req: Request, res: Response) => {
  try {
    const counsellors = await dbClient.counsellor.findMany({
      include: {
        languages: true,
        specialties: true,
      },
    });
    res.json({ data: counsellors });
  } catch (error) {
    res.json({ error });
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const foundCounsellor = await dbClient.counsellor.findUnique({
      where: {
        id,
      },
      include: {
        specialties: true,
        reviews: true,
      },
    });
    res.json({ data: foundCounsellor });
  } catch (error) {
    res.json({ error });
  }
};

export const addCounsellor = async (req: Request, res: Response) => {
  const newCounsellor = req.body;

  try {
    const created = await dbClient.counsellor.create({
      data: {
        ...newCounsellor,
      },
    });
    res.json({ data: created });
  } catch (error) {
    res.json({ error });
  }
};

export const updateCounsellor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updateInfo = req.body;

  try {
    const existCounsellor = await dbClient.counsellor.findUnique({
      where: {
        id,
      },
    });
    const updatedCounsellor = await dbClient.counsellor.update({
      where: {
        id,
      },
      data: {
        ...existCounsellor,
        ...updateInfo,
      },
    });
    res.json({ data: updatedCounsellor });
  } catch (error) {
    res.json({ error: `ID ${id} doesn't exict` });
  }
};
