const Sequelize = require("sequelize");

// const sequelize = new Sequelize("outbreak", "root", "Info@1234", {
//     host: 'localhost',
//     dialect: 'mysql'
// });

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "src/db/db.sqlite",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  })
  .catch(function () {
    console.log("Erro: Conexão com o banco de dados não realizada!");
  });

module.exports = sequelize;
