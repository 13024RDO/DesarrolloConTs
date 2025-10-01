import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db";
import User from "../models/User";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  await connectDB();
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = "Admin Formotex";

  if (!email || !password) {
    console.log("No ADMIN_EMAIL/ADMIN_PASSWORD en .env");
    process.exit(1);
  }

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin ya existe");
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const u = new User({ name, email, password: hashed, role: "admin" });
  await u.save();
  console.log("Admin creado:", email);
  process.exit(0);
};

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
