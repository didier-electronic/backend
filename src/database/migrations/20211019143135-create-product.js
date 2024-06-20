const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER(),
      },
      title: {
        type: new DataTypes.STRING(),
      },
      description: {
        type: new DataTypes.TEXT(),
      },
      price: {
        type: new DataTypes.STRING(),
      },
      productImage: {
        type: new DataTypes.JSONB(),
        allowNull: false,
      },
      cloudinaryImageId: {
        type: new DataTypes.ARRAY(DataTypes.TEXT),
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
    await queryInterface.dropTable("products");
  },
};
