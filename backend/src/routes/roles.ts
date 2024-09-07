import { Router } from 'express';
import { createRole, getRoles, deleteRole } from '../controllers/roleController';

const router = Router();

router.post('/', createRole);
router.get('/', getRoles);
router.delete('/:id', deleteRole);

export default router;
