module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
      },
    },
    {
      tableName: "user",
      timestamps: true,
      underscored: true,
    }
  );

  return User;
};
