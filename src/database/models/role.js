import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER(),
      },
      name: {
        type: new DataTypes.STRING(),
        allowNull: false,
        unique: true,
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
      modelName: "Role",
      tableName: "roles",
    }
  );
  return Role;
};
