const Narrativa = require("../models/narrativa");
const database = require("../config/db");

async function criarNarrativa(username, title, content) {
  await database.sync();
  const narrativa = await Narrativa.create({
    titulo: title,
    conteudo: content,
    usuario: username,
  });
  return narrativa;
}

async function listarNarrativas() {
  return await Narrativa.findAll({
    order: [["createdAt", "DESC"]],
  });
}

async function listarUltimasNarrativas() {
  return await Narrativa.findAll({
    order: [["createdAt", "DESC"]],
    limit: 5,
  });
}

async function buscarNarrativasporUsuario(username) {
  return await Narrativa.findAll({
    where: { usuario: username },
  });
}

async function editarNarrativa(id, content) {
  await database.sync();

  const narrativa = await Narrativa.findOne({
    where: { id: id },
  });

  if (!narrativa) {
    // tratar erro
  } else {
    await narrativa.update({
      conteudo: content,
    });
    await narrativa.save();
  }
  return narrativa;
}

async function deletarNarrativa(id) {
  const narrativa = await Narrativa.findOne({
    where: { id: id },
  });

  return await narrativa.destroy();
}

module.exports = {
  criarNarrativa,
  listarNarrativas,
  listarUltimasNarrativas,
  buscarNarrativasporUsuario,
  editarNarrativa,
  deletarNarrativa,
};
