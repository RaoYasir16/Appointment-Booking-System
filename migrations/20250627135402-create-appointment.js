'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true,
        allowNull:false
       
      },
      userId: {
        type: Sequelize.UUID
      },
      providerId: {
        type: Sequelize.UUID
      },
      serviceId: {
        type: Sequelize.UUID
      },
      appointmentDate: {
        type: Sequelize.DATE
      },
      timeSlot: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'cancelled','completed'),
        allowNull: false,
        defaultValue:"pending"
      },
      notes: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('appointments');
  }
};