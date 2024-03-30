
const express = require('express');
const router = express.Router();
const JobPost = require('../models/jobPost');

router.post('/add', async (req, res) => {
    try {
        const jobPost = await JobPost.create(req.body);
        res.status(201).json({ jobPost });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const jobPosts = await JobPost.find();
        res.json(jobPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a job post
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const jobPost = await JobPost.findByIdAndUpdate(id, req.body, { new: true });
        res.json(jobPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/del:id', async (req, res) => {
    try {
        const { id } = req.params;
        await JobPost.findByIdAndDelete(id);
        res.json({ message: 'Job post deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
