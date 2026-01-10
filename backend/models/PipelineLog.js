const mongoose = require('mongoose');

const pipelineLogSchema = new mongoose.Schema({
  workflowName: { type: String, required: true },
  runId: { type: Number, required: true },
  status: { type: String, required: true }, // success, failure, in_progress
  conclusion: String,
  branch: String,
  commitMessage: String,
  triggeredBy: String,
  startedAt: { type: Date, required: true },
  completedAt: Date,
  duration: Number, // in seconds
  logs: String // Full log output
}, { timestamps: true });

module.exports = mongoose.model('PipelineLog', pipelineLogSchema);