/**
 * Seed script to create admin user.
 * Usage: npm run seed
 * Make sure MONGODB_URI is set in your environment (Render -> Environment -> Add variable)
 *
 * Default admin credentials:
 *   email: admin@cybershield.co.ke
 *   password: demo123456
 *
 * This script will not overwrite an existing user with the same email.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Set it in environment variables.");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function run() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const email = 'admin@cybershield.co.ke';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin user already exists:', email);
    process.exit(0);
  }
  const hashed = await bcrypt.hash('demo123456', 10);
  const user = await User.create({ email, password: hashed, role: 'admin' });
  console.log('Created admin user:', user.email);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
