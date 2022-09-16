const Sequelize = require("sequelize");
const db = require("../config/db");

const Narrativa = db.define("narrativa", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  conteudo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Narrativa;
