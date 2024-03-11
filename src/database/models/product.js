import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      // Book.belongsTo(models.Genre, {
      //   as: "genre",
      //   foreignKey: "genreId",
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // });
    }
  }
  Product.init(
    {
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
        type: new DataTypes.STRING(),
      },
      price: {
        type: new DataTypes.STRING(),
      },
      productImage: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      cloudinaryImageId: {
        type: new DataTypes.STRING(),
      },
      createdAt: {
        allowNull: false,
        type: new DataTypes.DATE(),
      },
      updatedAt: {
        allowNull: false,
        type: new DataTypes.DATE(),
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  return Product;
};
