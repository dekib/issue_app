'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
        await queryInterface.createTable('issue', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
              },
            agent_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'agents',
                    key: 'id'
                },
            },
            user: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            job_id: {
                type: Sequelize.UUID
            },
            is_resolved: {
                type: Sequelize.BOOLEAN
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('issue');
    }
};
