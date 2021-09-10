import { Appointment } from ".prisma/client";
import { Request, Response } from "express";
import dbClient from "../../utils/dbClient";
import { User } from "@prisma/client";

export const getUsersAppointments = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const usersAppointments = await dbClient.appointment.findMany({
      where: {
        user_ID: id,
      },
    });
    res.json({ data: usersAppointments });
  } catch (error) {
    res.json({ error });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updateInfo = req.body;

  try {
    const existAppointment = await dbClient.appointment.findUnique({
      where: {
        id,
      },
    });
    const updatedAppointment = await dbClient.counsellor.update({
      where: {
        id,
      },
      data: {
        ...existAppointment,
        ...updateInfo,
      },
    });
    res.json({ data: updatedAppointment });
  } catch (error) {
    res.json({ error: `Appointment with ID ${id} doesn't exict` });
  }
};

export const addAppointment = async (req: Request, res: Response) => {
  const newAppointment: Appointment = req.body;

  try {
    const ifExcit = await dbClient.appointment.findUnique({
      where: {
        date_time: {
          time: newAppointment.time,
          date: newAppointment.date,
        },
      },
    });

    if (!ifExcit) {
      const created = await dbClient.appointment.create({
        data: {
          ...newAppointment,
        },
      });
      res.json({ data: created });
    } else {
      res.status(403).json({ msg: "PLease choose different time.." });
    }
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleted = await dbClient.appointment.delete({
      where: {
        // user_ID: req.currentUserId,
        id,
      },
    });
    res.json({ data: deleted });
  } catch (error) {
    res.json({ error });
  }
};
