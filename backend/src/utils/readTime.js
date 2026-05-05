/**
 * Estimate read time from content string.
 * Assumes ~200 words per minute reading speed.
 */
const calculateReadTime = (content) => {
  if (!content) return "1 min read";
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
};

export default calculateReadTime;
