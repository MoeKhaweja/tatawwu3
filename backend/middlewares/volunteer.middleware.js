const isVolunteer = async (req, res, next) => {
  if (req.user.role == "volunteer") {
    next();
  } else {
    return res.status(400).json({ error: "Forbidden" });
  }
};

module.exports = {
  isVolunteer,
};
