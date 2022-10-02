const Usuario = require("../models/usuario");

async function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).send({
      message: "Usuário não autorizado",
    });
  }

  const usuario = await Usuario.findByPk(token);

  if (!usuario) {
    return res.status(401).send({
      message: "Usuário não autorizado",
    });
  }

  req.user = {
    id: usuario.id,
    username: usuario.username,
    email: usuario.email,
  };

  next();
}

module.exports = auth;
