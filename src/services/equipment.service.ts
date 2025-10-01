import Equipment from "../models/Equipment";
import mongoose from "mongoose";

export const createEquipment = async (data: any) => {
  const equip = new Equipment(data);
  await equip.save();
  return equip;
};

export const listEquipment = async (filter: any = {}) => {
  return Equipment.find(filter).populate("assignedTo", "name email role").lean();
};

export const getEquipmentById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw { status: 400, message: "ID inválido" };
  const e = await Equipment.findById(id).populate("assignedTo", "name email role");
  if (!e) throw { status: 404, message: "Equipo no encontrado" };
  return e;
};

export const updateEquipment = async (id: string, data: any) => {
  const e = await getEquipmentById(id);
  Object.assign(e, data);
  await e.save();
  return e;
};

export const deleteEquipment = async (id: string) => {
  const e = await getEquipmentById(id);
  await e.deleteOne();
  return;
};
  