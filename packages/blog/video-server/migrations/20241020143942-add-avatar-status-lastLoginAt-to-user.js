'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true, // 根据需要设置为 true 或 false
    });
    await queryInterface.addColumn('Users', 'status', {
      type: Sequelize.TINYINT,
      allowNull: true, // 根据需要设置为 true 或 false
    });
    await queryInterface.addColumn('Users', 'lastLoginAt', {
      type: Sequelize.DATE,
      allowNull: true, // 根据需要设置为 true 或 false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'avatar');
    await queryInterface.removeColumn('Users', 'status');
    await queryInterface.removeColumn('Users', 'lastLoginAt');
  }
};