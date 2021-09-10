import { Request, Response } from "express";
import dbClient from "../../utils/dbClient";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await dbClient.review.findMany({
      include: {
        user: true,
        counsellor: true,
      },
    });
    res.json({ data: reviews });
  } catch (error) {
    res.json({ error });
  }
};

export const addReview = async (req: Request, res: Response) => {
  const newReview = req.body;

  try {
    const createdReview = await dbClient.review.create({
      data: {
        ...newReview,
      },
      include: {
        user: true,
      },
    });
    res.json({ data: createdReview });
  } catch (error) {
    res.json({ error });
  }
};
