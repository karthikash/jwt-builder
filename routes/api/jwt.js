const express = require("express");
const { validate } = require("../../validators");
const {
  fnSignJwtToken,
  fnVerifyJwtToken,
} = require("../../controllers/jwt.controller");

const JwtRouter = express.Router();

JwtRouter.post("/sign", validate("sign"), fnSignJwtToken);
JwtRouter.post("/verify", validate("verify"), fnVerifyJwtToken);

module.exports = JwtRouter;
