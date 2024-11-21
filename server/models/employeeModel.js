const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Employee = sequelize.define('employee', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
    },
    designation: {
      type: DataTypes.STRING,
    },
    project: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  return Employee;
};
