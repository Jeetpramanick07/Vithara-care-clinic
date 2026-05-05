import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

// POST /api/auth/login
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide username and password.",
    });
  }

  const admin = await Admin.findOne({ username: username.toLowerCase() });

  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password.",
    });
  }

  const token = generateToken(admin._id);

  // Optional: set token in httpOnly cookie as well
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    success: true,
    message: "Login successful.",
    token,
    admin: {
      id: admin._id,
      username: admin.username,
    },
  });
};

// POST /api/auth/logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully." });
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  const admin = req.admin;
  res.json({
    success: true,
    admin: {
      id: admin._id,
      username: admin.username,
    },
  });
};
