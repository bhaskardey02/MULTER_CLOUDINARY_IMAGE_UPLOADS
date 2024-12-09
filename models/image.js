module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      url: DataTypes.STRING,
      secure_url: DataTypes.STRING,
      tags: DataTypes.STRING,
      uploadedAt: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "Images",
      timestamps: true, // Automatically manages createdAt and updatedAt
    }
  );

  return Image;
};
