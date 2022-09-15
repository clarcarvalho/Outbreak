const Sequelize = require('sequelize');
const db = require('./db');

const Narrativa = db.define('narrativa',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    historia: {
        type: Sequelize.STRING,
        allowNull: false
    }

    
});

module.exports = Narrativa;