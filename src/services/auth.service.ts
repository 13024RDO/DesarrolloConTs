import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.util";

export const registerUser = async (data: {name: string, email: string, password: string, role?: string}) => {
  const { name, email, password, role } = data;

  const exists = await User.findOne({ email });
  if (exists) throw { status: 400, message: "Email ya registrado" };

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = new User({ name, email, password: hashed, role: role || "user" });
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: "Credenciales inválidas" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: "Credenciales inválidas" };

  const token = signToken({ id: user._id, role: user.role, email: user.email });
  return { user, token };
};
