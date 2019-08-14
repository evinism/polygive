'use strict';
module.exports = (sequelize, DataTypes) => {
  const Charity = sequelize.define('Charity', {
    title: DataTypes.STRING
  }, {});
  Charity.associate = function(models) {
    // associations can be defined here
  };
  return Charity;
};