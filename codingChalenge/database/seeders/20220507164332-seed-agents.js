'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('agents', [{
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Fred',
      current_issue_id: null,
      is_available: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      id: 'f269f1fe-4759-499d-a813-dfd6f1180db2',
      name: 'John',
      current_issue_id: null,
      is_available: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('agents', null, {});
  }
};
