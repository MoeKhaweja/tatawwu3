const isCommunity = async (req, res, next) => {
  if (req.user.role == "community") {
    next();
  } else {
    return res.status(400).json({ error: "Forbidden" });
  }
};

module.exports = {
  isCommunity,
};
