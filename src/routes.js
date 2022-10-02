const express = require("express");
const route = express.Router();
const path = require("path");
const userController = require("./controllers/userController");
const storiesController = require("./controllers/storiesController");
const auth = require("./middlewares/auth");

route.post("/cadastro", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const usuarioCriado = await userController.criarUsuario(
      email,
      password,
      username
    );

    res.send({
      id: usuarioCriado.id,
      email: usuarioCriado.email,
      username: usuarioCriado.username,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

route.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const usuarioLogado = await userController.logarUsuario(username, password);

  if (usuarioLogado.error)
    return res.status(401).send({ message: usuarioLogado.error });

  if (usuarioLogado) {
    res.send({
      user: {
        id: usuarioLogado.id,
        username: usuarioLogado.username,
        email: usuarioLogado.email,
      },
    });
  } else {
    res.status(401).send({
      message: "Usuário ou senha inválidos",
    });
  }
});

route.get("/eu", auth, async (req, res) => {
  const usuario = await userController.buscarUsuarioPorId(req.user.id);

  if (usuario) {
    return res.send({
      user: {
        ...usuario,
      },
    });
  }

  return res.status(404).send({
    message: "Usuário não encontrado",
  });
});

route.post("/narrativas", async (req, res) => {
  const { username, title, content } = req.body;

  try {
    const Story = await storiesController.criarNarrativa(
      username,
      title,
      content
    );
    res.send(Story);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

route.get("/narrativas/ultimas", async (req, res) => {
  const narrativas = await storiesController.listarUltimasNarrativas();
  res.send(narrativas);
});

route.get("/narrativas", async (req, res) => {
  const narrativas = await storiesController.listarNarrativas();
  res.send(narrativas);
});

route.get("/narrativasPostadas/:username", async (req, res) => {
  const narrativas = await storiesController.buscarNarrativasporUsuario(
    req.params.username
  );
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
