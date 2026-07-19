import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@test.com" || password !== "admin123") {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  res.json({ token });
};
