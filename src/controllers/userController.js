const Usuario = require("../models/usuario");
const database = require("../config/db");

async function criarUsuario(email, password, username) {
  await database.sync();

  const usuario = await Usuario.findOne({
    where: {
      username: username,
    },
  });

  if (usuario) {
    throw new Error("Usuário já existe");
  }

  const usuarioCriado = await Usuario.create({
    email: email,
    password: password,
    username: username,
  });

  return usuarioCriado;
}

async function logarUsuario(username, password) {
  const usuario = await Usuario.findOne({
    where: {
      username: username,
    },
  });

  if (!usuario) return { error: "Usuário não encontrado" };

  if (usuario.password === password) {
    return usuario;
  } else {
    return {
      error: "Usuário ou senha inválidos",
    };
  }
}

async function buscarUsuarioPorId(id) {
  const usuario = await Usuario.findByPk(id);

  if (usuario) {
    return {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
    };
  }

  return null;
}

module.exports = {
  criarUsuario,
  logarUsuario,
  buscarUsuarioPorId,
};
