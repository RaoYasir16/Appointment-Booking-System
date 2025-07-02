'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('providerProfiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type:Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID,
        allowNull:false
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      about: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull:false
      },
      location: {
        type: Sequelize.STRING,
        allowNull:false
      },
      availableDays: {
        type: Sequelize.STRING,
        allowNull:false
      },
      startTime: {
        type: Sequelize.STRING,
        allowNull:false
      },
      endTime: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('providerProfiles');
  }
};