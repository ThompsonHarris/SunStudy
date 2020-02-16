const userRouter = require("express").Router();

userRouter.get("/", (req, res, next) => {
  res.send("user");
});

module.exports = userRouter;
