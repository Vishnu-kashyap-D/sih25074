const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Forum routes
router.get('/forum/posts', communityController.getForumPosts);
router.post('/forum/posts', communityController.createForumPost);

// Expert Connect routes
router.get('/experts', communityController.getExperts);
router.post('/experts/book', communityController.bookExpertConsultation);

// Success Stories routes
router.get('/stories', communityController.getSuccessStories);

// Common interaction routes
router.post('/:contentType/:contentId/like', communityController.likeContent);
router.post('/:contentType/:contentId/comment', communityController.addComment);

module.exports = router;