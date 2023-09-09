class response {
  // Success Response
  async success(res, message, data) {
    res.status(200).json({
      status: "success",
      message: message || "success",
      innerData: data || null,
    });
  }

  // Created Response
  async created(res, message, data) {
    res.status(201).json({
      status: "success",
      message: message || "created",
      innerData: data || null,
    });
  }

  // Error Response
  async error(res, message, data) {
    res.status(400).json({
      status: "error",
      message: message || "error",
      innerData: data || null,
    });
  }

  // Warning Response
  async warning(res, message, data) {
    res.status(400).json({
      status: "warning",
      message: message || "warning",
      innerData: data || null,
    });
  }

  // Not Found Response
  async notFound(res, message, data) {
    res.status(404).json({
      status: "warning",
      message: message || "not found",
      innerData: data || null,
    });
  }

  // Internal Server Error Response
  async internal(res, message, data) {
    res.status(500).json({
      status: "error",
      message: message || "internal server error",
      innerData: data || null,
    });
  }
}

module.exports = new response();
