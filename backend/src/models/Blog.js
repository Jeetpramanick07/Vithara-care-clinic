import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      trim: true,
      default: "",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    category: {
      type: String,
      enum: [
        "Family Health",
        "Pediatric Care",
        "Preventive Care",
        "Elderly Care",
        "Wellness",
        "Follow-up Care",
      ],
      default: "Family Health",
    },
    tags: {
      type: [String],
      default: [],
    },
    careTip: {
      type: String,
      default: "",
    },
    careLevel: {
      type: String,
      enum: ["Routine", "Recommended", "Important"],
      default: "Routine",
    },
    coverImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: String,
      default: "3 min read",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
