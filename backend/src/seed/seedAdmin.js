/**
 * Seed script — creates the first admin account.
 *
 * Run once: npm run seed
 *
 * Uses ADMIN_USERNAME and ADMIN_PASSWORD from .env
 */
import "dotenv/config";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  await connectDB();

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error("❌ ADMIN_PASSWORD is not set in .env");
    process.exit(1);
  }

  const existing = await Admin.findOne({ username });

  if (existing) {
    console.log(`ℹ️  Admin "${username}" already exists. Skipping seed.`);
    process.exit(0);
  }

  await Admin.create({ username, password });

  console.log(`✅ Admin account created:`);
  console.log(`   Username: ${username}`);
  console.log(`   Password: (as set in .env ADMIN_PASSWORD)`);

  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
