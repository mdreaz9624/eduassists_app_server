

// routes/galleryRoutes.js

const express = require('express');
const router = express.Router();
const { 
    getGalleryData, 
    postGalleryData, 
    updateGalleryLike,
    incrementGalleryView 
} = require('../controllers/galleryController');

router.get('/', getGalleryData);
router.post('/', postGalleryData);
router.patch('/:id/like', updateGalleryLike);
router.patch('/:id/view', incrementGalleryView);

module.exports = router;