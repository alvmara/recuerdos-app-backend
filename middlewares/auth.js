const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "Acceso no autorizado" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log('error verifying', err);
      return next(err);
    }

    req.user = decoded;

    next();
  });
};
