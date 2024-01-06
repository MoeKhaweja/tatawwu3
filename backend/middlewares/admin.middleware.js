const isAdmin = async (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else {
    return res.status(400).json({ error: "Forbidden" });
  }
};

module.exports = {
  isAdmin,
};
