import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectController.js';

router.get('/', protect, getProjects);
router.get('/:id', protect, getProject);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;

