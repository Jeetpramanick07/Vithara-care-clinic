import Blog from "../models/Blog.js";
import Appointment from "../models/Appointment.js";

export const getAdminStats = async (req, res) => {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      featuredBlogs,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,
      recentAppointments,
      recentBlogs,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      Blog.countDocuments({ featured: true }),

      Appointment.countDocuments(),
      Appointment.countDocuments({ status: "pending" }),
      Appointment.countDocuments({ status: "confirmed" }),
      Appointment.countDocuments({ status: "completed" }),
      Appointment.countDocuments({ status: "cancelled" }),

      Appointment.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Blog.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("-content"),
    ]);

    const mostRequestedServiceAgg = await Appointment.aggregate([
      {
        $group: {
          _id: "$service",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const mostUsedBlogCategoryAgg = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const mostRequestedService =
      mostRequestedServiceAgg.length > 0
        ? mostRequestedServiceAgg[0]._id
        : "—";

    const mostUsedBlogCategory =
      mostUsedBlogCategoryAgg.length > 0
        ? mostUsedBlogCategoryAgg[0]._id
        : "—";

    res.json({
      success: true,

      totalBlogs,
      publishedBlogs,
      draftBlogs,
      featuredBlogs,

      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,

      mostRequestedService,
      mostUsedBlogCategory,

      recentAppointments,
      recentBlogs,
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load admin dashboard stats.",
      error: error.message,
    });
  }
};