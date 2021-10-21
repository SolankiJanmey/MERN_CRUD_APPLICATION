module.exports = (sequelize, Sequelize) => {
  const Books = sequelize.define(
    "books",
    {
      book_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "user_id",
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
        defaultValue:
          "https://media.istockphoto.com/photos/group-of-unrecognisable-international-students-having-online-meeting-picture-id1300822108?k=20&m=1300822108&s=612x612&w=0&h=Jy_UmCzvh6Pt-oOv-1MG8FWDZbZwiJlbow2_ODmlkJ8=",
      },
      author: {
        type: Sequelize.STRING,
      },
      rating: { type: Sequelize.INTEGER },
      category: {
        type: Sequelize.STRING,
      },
      description: { type: Sequelize.TEXT },
    },
    {
      tableName: "books",
      timestamps: true,
      underscored: true,
    }
  );

  return Books;
};
