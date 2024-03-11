import { comparePassword, hashPassword } from "../../utils/password";

import { Model, DataTypes } from "sequelize";

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        as: "role",
        foreignKey: "roleId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
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
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      phone: {
        type: new DataTypes.STRING(),
        allowNull: false,
        unique: true,
      },
      address: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      roleId: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 2,
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
      freezeTableName: true,
      modelName: "User",
      tableName: "users",
    }
  );

  User.beforeCreate(async (_user) => {
    const user = _user;
    if (user.password) {
      user.password = await hashPassword(user.password);
    }
  });

  User.beforeBulkUpdate(async (_user) => {
    const { attributes } = _user;
    if (attributes.password) {
      attributes.password = await hashPassword(attributes.password);
    }
  });

  User.prototype.comparePassword = async function compareUserPassword(
    password
  ) {
    return comparePassword(password, this.get().password);
  };

  return User;
};
