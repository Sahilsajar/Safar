const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.send({
        message: "Auth failed",
        success: false,
        data: null,
      });
    }
    const decoded = jwt.verify(token, "safar");
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.send({
      message: "Authentication failed",
      success: false,
    });
  }
};
