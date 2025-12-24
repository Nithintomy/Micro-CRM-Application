import request from 'supertest';
import app from '../app';

let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'admin@codeace.com',
      password: 'admin@codeace123',
    });

  expect(res.status).toBe(200);
  token = res.body.token;
  expect(token).toBeDefined();
});

describe('Contacts CRUD', () => {
  it('should create, fetch, and delete a contact (admin)', async () => {
    const createRes = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Contact',
        email: 'test@contact.com',
      });

    expect(createRes.status).toBe(201); 
    const contactId = createRes.body.id;
    expect(contactId).toBeDefined();

    const fetchRes = await request(app)
      .get('/contacts')
      .set('Authorization', `Bearer ${token}`);

    expect(fetchRes.status).toBe(200);
    expect(Array.isArray(fetchRes.body)).toBe(true);

    const deleteRes = await request(app)
      .delete(`/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes.status).toBe(200);
  });
});
