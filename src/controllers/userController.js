const Usuario = require("../models/usuario");
const database = require("../config/db");

async function criarUsuario(email, password, username) {
  await database.sync();

  const usuarioCriado = await Usuario.create({
    email: email,
    password: password,
    username: username,
  });

  return usuarioCriado;
}

async function logarUsuario(email, password) {
  console.log(email, password);
  const usuario = await Usuario.findOne({
    where: {
      email: email,
    },
  });

  if (usuario.password === password) {
    return usuario;
  } else {
    return null;
  }
}

module.exports = {
  criarUsuario,
  logarUsuario,
};
