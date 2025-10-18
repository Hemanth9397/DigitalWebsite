import Project from "../models/projects.js";

// @desc Search & paginate projects
// @route GET /api/v1/projects
// @access Public
export const getProjects = async (req, res) => {
  try {
    const { q = "", page = 1, limit = 8 } = req.query;
    const searchQuery = q.trim();

    const filter = searchQuery
      ? {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
            { category: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Project.countDocuments(filter);

    res.status(200).json({
      success: true,
      page: Number(page),
      total,
      totalPages: Math.ceil(total / limit),
      projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
