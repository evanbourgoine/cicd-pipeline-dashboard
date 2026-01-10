const express = require('express');
const router = express.Router();
const PipelineLog = require('../models/PipelineLog');
const BuildMetadata = require('../models/BuildMetadata');
const githubService = require('../services/githubService');
const auth = require('../middleware/auth');

// Get all pipeline runs
router.get('/runs', auth, async (req, res) => {
  try {
    const logs = await PipelineLog.find()
      .sort({ startedAt: -1 })
      .limit(50);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pipeline statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalRuns = await PipelineLog.countDocuments();
    const successRuns = await PipelineLog.countDocuments({ conclusion: 'success' });
    const failedRuns = await PipelineLog.countDocuments({ conclusion: 'failure' });
    
    const avgDuration = await PipelineLog.aggregate([
      { $match: { duration: { $ne: null } } },
      { $group: { _id: null, avg: { $avg: '$duration' } } }
    ]);

    res.json({
      totalRuns,
      successRuns,
      failedRuns,
      successRate: ((successRuns / totalRuns) * 100).toFixed(2),
      avgDuration: avgDuration[0]?.avg || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get build metadata
router.get('/metadata/:runId', auth, async (req, res) => {
  try {
    const metadata = await BuildMetadata.findByPk(req.params.runId);
    if (!metadata) {
      return res.status(404).json({ error: 'Metadata not found' });
    }
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync GitHub data
router.post('/sync', auth, async (req, res) => {
  try {
    const { owner, repo } = req.body;
    const result = await githubService.syncPipelineData(owner, repo);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;