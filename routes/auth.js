const express = require("express");
const { login, register } = require("../services/auth");
const router = express.Router();

router.post("/login", async (request, response, next) => {
  const {
    body: { emailOrUsername, password },
  } = request;

  try {
    const data = await login(emailOrUsername, password);

    response.json(data);
  } catch(e) {
    next(e);
  }
});

router.post("/register", async (request, response, next) => {
  const { body: user } = request;
  
  try {
    const data = await register(user);

    response.json(data);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
