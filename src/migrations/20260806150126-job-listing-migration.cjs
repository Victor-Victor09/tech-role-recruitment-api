'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('jobListings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      employerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'employerProfiles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      techRole: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // techStack: {
      //   type: Sequelize.ARRAY(Sequelize.STRING),
      //   allowNull: true,
      // },
      workPreference: {
        type: Sequelize.ENUM("remote", "on-site", "hybrid"),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("open", "closed"),
        allowNull: false,
        defaultValue: "open",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('josbListings');
  }
};
