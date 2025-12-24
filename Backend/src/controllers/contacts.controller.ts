import { Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middleware/auth";

export const getContacts = async (req: AuthRequest, res: Response) => {
  const orgId = req.user!.organizationId;

  const result = await pool.query(
    `SELECT * FROM contacts WHERE organization_id = $1`,
    [orgId]
  );

  res.json(result.rows);
};

export const createContact = async (req: AuthRequest, res: Response) => {
  const { name, email, phone, notes } = req.body;
  const { organizationId, id } = req.user!;

  const result = await pool.query(
    `INSERT INTO contacts (name, email, phone, notes, organization_id, created_by)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [name, email, phone, notes, organizationId, id]
  );

  res.status(201).json(result.rows[0]);
};

export const updateContact = async (req: AuthRequest, res: Response) => {
  const contactId = req.params.id;
  const { name, email, phone, notes } = req.body;
  const orgId = req.user!.organizationId;

  const existing = await pool.query(
    `SELECT * FROM contacts WHERE id = $1 AND organization_id = $2`,
    [contactId, orgId]
  );

  if (!existing.rowCount) {
    return res.status(404).json({ message: "Not found" });
  }

  const contact = existing.rows[0];

  const updatedName = name ?? contact.name;
  const updatedEmail = email ?? contact.email;
  const updatedPhone = phone ?? contact.phone;
  
  const updatedNotes = notes ?? contact.notes;

  const result = await pool.query(
    `UPDATE contacts
     SET name = $1,
         email = $2,
         phone = $3,
         notes = $4,
         updated_at = NOW()
     WHERE id = $5 AND organization_id = $6
     RETURNING *`,
    [updatedName, updatedEmail, updatedPhone, updatedNotes, contactId, orgId]
  );

  res.json(result.rows[0]);
};

export const deleteContact = async (req: AuthRequest, res: Response) => {
  const contactId = req.params.id;
  const orgId = req.user!.organizationId;

  await pool.query(`DELETE FROM contacts WHERE id=$1 AND organization_id=$2`, [
    contactId,
    orgId,
  ]);

  res.status(200).json({
    message: "Contact deleted successfully",
  });
};
