'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    if (process.env.NODE_ENV === 'production') return;

    const [org] = await queryInterface.bulkInsert(
      'organizations',
      [{
        name: 'default Organization',
        created_at: new Date(),
      }],
      { returning: ['id'] }
    );

    const adminHash = await bcrypt.hash('admin@codeace123', 10);
    const memberHash = await bcrypt.hash('member@codeace123', 10);

    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@codeace.com',
        password: adminHash,
        role: 'ADMIN',
        organization_id: org.id,
        created_at: new Date(),
      },
      {
        email: 'member@codeace.com',
        password: memberHash,
        role: 'MEMBER',
        organization_id: org.id,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@codeace.com', 'member@codeace.com'],
    });

    await queryInterface.bulkDelete('organizations', {
      name: 'default Organization',
    });
  },
};
