module.exports = {
  dev: {
    username: process.env.MADIBA_DEV_USER,
    password: process.env.MADIBA_DEV_PASSWORD,
    database: process.env.MADIBA_DEV_DATABASE,
    host: process.env.MADIBA_DEV_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    dialect: "postgres",
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    username: process.env.MADIBA_USER,
    password: process.env.MADIBA_PASSWORD,
    database: process.env.MADIBA_DATABASE,
    host: process.env.MADIBA_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    seederStorage: "sequelize",
  },
};
