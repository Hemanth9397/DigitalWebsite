import { User } from "../models/user.js";
import HttpError from "../models/http-error.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password"); // exclude password
    res.json(users);
  } catch (err) {
    next(new HttpError("Failed to fetch users", 500));
  }
};

const approveUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!user) return next(new HttpError("User not found", 404));
    res.json({ message: "User approved" });
  } catch (err) {
    next(new HttpError("Approval failed", 500));
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Failed to delete user", 500));
  }
};

export default { getAllUsers, approveUser, deleteUser };