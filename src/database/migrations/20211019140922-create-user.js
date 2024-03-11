const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER(),
      },
      names: {
        type: new DataTypes.STRING(),
      },
      email: {
        type: new DataTypes.STRING(),
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(),
      },
      phone: {
        type: new DataTypes.STRING(),
        unique: true,
      },
      address: {
        type: new DataTypes.STRING(),
      },
      roleId: {
        type: new DataTypes.INTEGER(),
      },

      createdAt: {
        allowNull: false,
        type: new DataTypes.DATE(),
      },
      updatedAt: {
        allowNull: false,
        type: new DataTypes.DATE(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
