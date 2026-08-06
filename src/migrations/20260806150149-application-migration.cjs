'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      applicantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'applicantProfiles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      jobListingId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'jobListings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM("applied", "under review", "hired", "rejected"),
        allowNull: false,
        defaultValue: "applied",
      },
      coverNote: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      appliedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      cancelledAt: {
        type: Sequelize.DATE,
        allowNull: true, //soft delete, if application is cancelled, we can set this field to the current date and time
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('applications');
  }
};
