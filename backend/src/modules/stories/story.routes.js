import { Router } from 'express';
import {
  getStories,
  getStoryBySlug,
  createStory,
  updateStory,
  deleteStory,
} from './story.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

router.get('/', getStories);
router.get('/:slug', getStoryBySlug);
router.post('/', protect, createStory);
router.put('/:id', protect, updateStory);
router.delete('/:id', protect, deleteStory);

export default router;
