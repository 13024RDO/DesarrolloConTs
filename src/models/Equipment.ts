import mongoose, { Document, Schema } from "mongoose";

export type EquipmentStatus = "available" | "in_use" | "maintenance" | "retired";

export interface IEquipment extends Document {
  serialNumber: string;
  assetTag?: string;
  type: string;
  brand?: string;
  model?: string;
  specs?: Record<string, any>;
  status: EquipmentStatus;
  location?: string;
  assignedTo?: mongoose.Types.ObjectId; // referencia a User
  purchaseDate?: Date;
  warrantyUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EquipmentSchema = new Schema<IEquipment>(
  {
    serialNumber: { type: String, required: true, unique: true },
    assetTag: { type: String, unique: true, sparse: true },
    type: { type: String, required: true }, // ej: "laptop", "monitor", "desktop"
    brand: { type: String },
    model: { type: String },
    specs: { type: Schema.Types.Mixed },
    status: {
      type: String,
      enum: ["available", "in_use", "maintenance", "retired"],
      default: "available"
    },
    location: { type: String },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    purchaseDate: { type: Date },
    warrantyUntil: { type: Date }
  },
  { timestamps: true }
);


EquipmentSchema.index({ serialNumber: 1 }, { unique: true });
EquipmentSchema.index({ assetTag: 1 }, { unique: true, sparse: true });

export default mongoose.model<IEquipment>("Equipment", EquipmentSchema);
