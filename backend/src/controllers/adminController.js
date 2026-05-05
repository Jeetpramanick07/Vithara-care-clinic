import Blog from "../models/Blog.js";
import Appointment from "../models/Appointment.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: "published" });
    const draftBlogs = await Blog.countDocuments({ status: "draft" });
    const featuredBlogs = await Blog.countDocuments({ featured: true });

    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({
      status: "pending",
    });
    const confirmedAppointments = await Appointment.countDocuments({
      status: "confirmed",
    });
    const completedAppointments = await Appointment.countDocuments({
      status: "completed",
    });
    const cancelledAppointments = await Appointment.countDocuments({
      status: "cancelled",
    });

    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-content");

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

      mostRequestedService:
        mostRequestedServiceAgg.length > 0
          ? mostRequestedServiceAgg[0]._id
          : "—",

      mostUsedBlogCategory:
        mostUsedBlogCategoryAgg.length > 0
          ? mostUsedBlogCategoryAgg[0]._id
          : "—",

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