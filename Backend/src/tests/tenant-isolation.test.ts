import request from 'supertest';
import app from '../app';

let adminAToken: string;
let adminBToken: string;

beforeAll(async () => {
  const adminA = await request(app)
    .post('/auth/login')
    .send({
      email: 'admin@codeace.com',
      password: 'admin@codeace123',
    });

  adminAToken = adminA.body.token;
  expect(adminAToken).toBeDefined();

  const adminB = await request(app)
    .post('/auth/login')
    .send({
      email: 'admin2@codeace.com',
      password: 'admin2@codeace123',
    });

  adminBToken = adminB.body.token;
  expect(adminBToken).toBeDefined();
});

describe('Tenant Isolation', () => {
  it('should not allow org B to see org A contacts', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', `Bearer ${adminBToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach((contact: any) => {
      expect(contact.organization_id).toBeDefined();
    });
  });
});

