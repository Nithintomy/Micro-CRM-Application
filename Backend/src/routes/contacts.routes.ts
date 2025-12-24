import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/role';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.controller';

const router = Router();

router.use(authenticate);

router.get('/', getContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', requireAdmin, deleteContact);

export default router;
