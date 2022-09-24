const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

router.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});
router.get("/", async (req, res) => {
  res.send("Página inicial - Outbreak");
});
router.get("/feed", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "feed.html"));
});

router.post("/cadastro-form", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  console.log({
    email,
    username,
    password,
  });
  res.send({
    email,
    username,
    password,
  });
});

router.post("/login-form", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  console.log({
    email,
    username,
    password,
  });
  res.send({
    email,
    username,
    password,
  });
});

router.post("/feed-form", (req, res) => {
  const Narrativa = req.body.Narrativa;
  console.log({
    Narrativa,
  });
  res.send({
    Narrativa,
  });
});

module.exports = router;
