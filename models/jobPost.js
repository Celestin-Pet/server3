// models/jobPost.js
const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true }
});

module.exports = mongoose.model('JobPost', jobPostSchema);
