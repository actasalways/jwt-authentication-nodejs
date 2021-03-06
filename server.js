require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
  {
    username: "Erdem",
    title: "Post Erdem",
  },
  {
    username: "Engin",
    title: "Post Engin",
  },
];

app.get("/posts", authenticationToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});



function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // false token

    req.user = user;
    next();
  });
}

app.listen(3000);
