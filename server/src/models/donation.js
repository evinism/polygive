'use strict';
module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donation', {
    amount: DataTypes.NUMERIC(11, 2),
    charityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.ENUM(['pending', 'submitted']),
    donatedAt: DataTypes.DATE,
  }, {});
  Donation.associate = function(models) {
    // associations can be defined here
  };
  return Donation;
};