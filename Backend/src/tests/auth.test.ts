import request from 'supertest';
import app from '../app';

describe('Authentication', () => {
  it('should login successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@codeace.com',
        password: 'admin@codeace123',
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should fail login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@codeace.com',
        password: 'wrongpassword',
      });

    expect(res.status).toBe(401);
  });
});
