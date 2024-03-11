const bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hashSync(password);

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          names: "admin",
          email: "admin@admin.admin",
          password: hashPassword("adminElectronics456!"),
          phone: "00000000",
          address: "kigali",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
