import userModel from "../models/userModel.js";

// Get all employees
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const department = req.query.department || "";
    const status = req.query.status || "";
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    let query = {};

    // search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Filter
    if(department) {
      query.department = department;
    }
    if(status){
      query.status = status;
    }

    const total = await userModel.countDocuments(query);

   const users = await userModel
      .find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      totalUsers: total,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user;
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new employee
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, department, salary, joiningDate, status } =
      req.body;
    // All fields check
    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !salary ||
      !joiningDate ||
      !status
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if the mail is already a user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = await userModel.create({
      name,
      email,
      phone,
      department,
      salary,
      joiningDate,
      status,
    });

    res.status(201).json({ message: "New user created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const checkUser = await userModel.findById(req.params.id);

    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      // Only data to be updated can be passed
      { $set: req.body },
      { new: true, runValidators: true },
    );

    res.status(200).json({ message: "User data updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User unavailable" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
