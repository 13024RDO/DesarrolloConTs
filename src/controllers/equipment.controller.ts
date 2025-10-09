import { Request, Response, NextFunction } from "express";
import * as equipmentService from "../services/equipment.service";


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const e = await equipmentService.createEquipment(req.body);
    return res.status(201).json({ success: true, data: e });
  } catch (err) {
    next(err);
  }
};


export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    let filter = {};
    if (user.role === "user") {
      filter = { assignedTo: user.id };
    }
    const list = await equipmentService.listEquipment(filter);
    return res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const e = await equipmentService.getEquipmentById(req.params.id);
    return res.json({ success: true, data: e });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const e = await equipmentService.updateEquipment(req.params.id, req.body);
    return res.json({ success: true, data: e });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await equipmentService.deleteEquipment(req.params.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
