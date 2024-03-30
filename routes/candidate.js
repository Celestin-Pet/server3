
const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

router.post('/add', async (req, res) => {
    try {
        const candidate = await Candidate.create(req.body);
        res.status(201).json({ candidate });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all candidates
router.get('/get', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await Candidate.findByIdAndUpdate(id, req.body, { new: true });
        res.json(candidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/del:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Candidate.findByIdAndDelete(id);
        res.json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
