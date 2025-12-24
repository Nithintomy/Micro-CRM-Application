import { Request, Response } from 'express';
import pool from '../config/db';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../utils/hash';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await pool.query(
    `SELECT id, password, role, organization_id
     FROM users WHERE email = $1`,
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      id: user.id,
      organizationId: user.organization_id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
