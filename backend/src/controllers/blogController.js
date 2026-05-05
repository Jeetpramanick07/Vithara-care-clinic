import Blog from "../models/Blog.js";
import slugify from "../utils/slugify.js";
import calculateReadTime from "../utils/readTime.js";

// GET /api/blogs
// Public: only published blogs
export const getBlogs = async (req, res) => {
  const { category, featured, limit = 20, page = 1 } = req.query;

  const filter = {
    status: "published",
  };

  if (category) filter.category = category;
  if (featured === "true") filter.featured = true;

  const total = await Blog.countDocuments(filter);

  const blogs = await Blog.find(filter)
    .sort({ featured: -1, createdAt: -1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .select("-content");

  res.json({
    success: true,
    total,
    page: Number(page),
    blogs,
  });
};

// GET /api/blogs/admin/all
// Admin: view all blogs including draft and published
export const getAdminBlogs = async (req, res) => {
  const { status, category, featured, limit = 100, page = 1 } = req.query;

  const filter = {};

  if (status && status !== "all") {
    filter.status = status;
  }

  if (category) filter.category = category;
  if (featured === "true") filter.featured = true;

  const total = await Blog.countDocuments(filter);

  const blogs = await Blog.find(filter)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  res.json({
    success: true,
    total,
    page: Number(page),
    blogs,
  });
};

// GET /api/blogs/admin/:id
// Admin: get one blog by ID for editing
export const getAdminBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found.",
    });
  }

  res.json({
    success: true,
    blog,
  });
};

// GET /api/blogs/:slug
// Public: only published blog detail
export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found.",
    });
  }

  res.json({
    success: true,
    blog,
  });
};

// POST /api/blogs
// Admin only
export const createBlog = async (req, res) => {
  const {
    title,
    excerpt,
    content,
    category,
    tags,
    careTip,
    careLevel,
    coverImage,
    status,
    featured,
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required.",
    });
  }

  let baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (await Blog.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const readTime = calculateReadTime(content);

  const parsedTags =
    typeof tags === "string"
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : tags || [];

  const blog = await Blog.create({
    title,
    slug,
    excerpt: excerpt || "",
    content,
    category: category || "Family Health",
    tags: parsedTags,
    careTip: careTip || "",
    careLevel: careLevel || "Routine",
    coverImage: coverImage || "",
    status: status || "draft",
    featured: Boolean(featured),
    readTime,
  });

  res.status(201).json({
    success: true,
    message: "Blog post created.",
    blog,
  });
};

// PUT /api/blogs/:id
// Admin only
export const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found.",
    });
  }

  const {
    title,
    excerpt,
    content,
    category,
    tags,
    careTip,
    careLevel,
    coverImage,
    status,
    featured,
  } = req.body;

  if (title && title !== blog.title) {
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await Blog.findOne({ slug, _id: { $ne: blog._id } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    blog.slug = slug;
    blog.title = title;
  }

  if (content !== undefined) {
    blog.content = content;
    blog.readTime = calculateReadTime(content);
  }

  if (excerpt !== undefined) blog.excerpt = excerpt;
  if (category !== undefined) blog.category = category;

  if (tags !== undefined) {
    blog.tags =
      typeof tags === "string"
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : tags;
  }

  if (careTip !== undefined) blog.careTip = careTip;
  if (careLevel !== undefined) blog.careLevel = careLevel;
  if (coverImage !== undefined) blog.coverImage = coverImage;
  if (status !== undefined) blog.status = status;
  if (featured !== undefined) blog.featured = Boolean(featured);

  const updated = await blog.save();

  res.json({
    success: true,
    message: "Blog post updated.",
    blog: updated,
  });
};

// DELETE /api/blogs/:id
// Admin only
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found.",
    });
  }

  res.json({
    success: true,
    message: "Blog post deleted.",
  });
};