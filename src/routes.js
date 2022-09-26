const express = require("express");
const route = express.Router();
const path = require("path");
const userController = require("./controllers/userController");
const storiesController = require("./controllers/storiesController");

route.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

route.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

route.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});

route.get("/", async (req, res) => {
  res.send("Página inicial - Outbreak");
});

route.get("/feed", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "feed.html"));
});

route.post("/cadastro-form", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const usuarioCriado = await userController.criarUsuario(
    email,
    password,
    username
  );

  res.send(usuarioCriado);
});

route.post("/login-form", async (req, res) => {
  const { email, password } = req.body;

  const usuarioLogado = await userController.logarUsuario(email, password);

  if (usuarioLogado) {
    res.redirect("/feed");
  } else {
    res.send({ message: "deu ruim" });
  }
});

route.post("/narrativas", async (req, res) => {
  const { username, content } = req.body;
  const Story = await storiesController.criarNarrativa(username, content);

  res.send(Story);
});

route.get("/narrativas", async (req, res) => {
  const narrativas = await storiesController.listarNarrativas();
  res.send(narrativas);
});

route.patch("/narrativas/:id", async (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  const Story = await storiesController.editarNarrativa(id, content);
  res.send(Story);
});

route.delete("/narrativas/:id", async (req, res) => {
  const id = req.params.id;
  res.send(await storiesController.deletarNarrativa(id));
});

module.exports = route;
