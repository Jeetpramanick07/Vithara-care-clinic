// Global error handler — must have 4 parameters for Express to treat it as error middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    // Only include stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
