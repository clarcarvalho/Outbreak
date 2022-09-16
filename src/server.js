// (async () => {
//   const db = require("./config/db");

//   const resultado = await db.authenticate();
//   console.log("Conectado ao banco de dados");

//   const Narrativa = require("./models/narrativa");

//   try {
//     const resultado = await db.sync();
//     // console.log(resultado);
//   } catch (error) {
//     console.log(error);
//   }

//   const resultadoCreate = await Narrativa.create({
//     conteudo: "fanfic vampiro",
//   });
//   console.log(resultadoCreate);

//   const narrativa = await Narrativa.findByPk(1);
//   console.log(narrativa);
//   narrativa.conteudo = "nova história";

//   const resultadoSave = await narrativa.save();
//   console.log(resultadoSave);
// })();

const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});
app.get("/", async (req, res) => {
  res.send("Página inicial - Outbreak");
});
app.get("/feed", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "feed.html"));
});

app.post("/cadastro-form", (req, res) => {
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

app.post("/login-form", (req, res) => {
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

app.post("/feed-form", (req, res) => {
  const Narrativa = req.body.Narrativa;
  console.log({
    Narrativa,
  });
  res.send({
    Narrativa,
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});
