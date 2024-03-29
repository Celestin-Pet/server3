const express = require('express');
const router = express.Router();
const JobPost = require('../models/data');

// Get all job posts
router.get('/', async (req, res) => {
    try {
        const jobPosts = await JobPost.find();
        res.json(jobPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single job post
router.get('/:id', async (req, res) => {
    try {
        const jobPost = await JobPost.findById(req.params.id);
        if (!jobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }
        res.json(jobPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new job post
router.post('/', async (req, res) => {
    const { title, description, requirements } = req.body;
    const jobPost = new JobPost({ title, description, requirements });
    try {
        const newJobPost = await jobPost.save();
        res.status(201).json(newJobPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Update a job post
router.patch('/:id', async (req, res) => {
    try {
        const updatedJobPost = await JobPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }
        res.json(updatedJobPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedJobPost = await JobPost.findByIdAndDelete(req.params.id);
        if (!deletedJobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }
        res.json({ message: 'Job post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
