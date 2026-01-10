const axios = require('axios');
const PipelineLog = require('../models/PipelineLog');
const BuildMetadata = require('../models/BuildMetadata');

class GitHubService {
  constructor() {
    this.apiUrl = 'https://api.github.com';
    this.headers = {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    };
  }

  async fetchWorkflowRuns(owner, repo, workflowId = null) {
    try {
      const url = workflowId 
        ? `${this.apiUrl}/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`
        : `${this.apiUrl}/repos/${owner}/${repo}/actions/runs`;
      
      const response = await axios.get(url, { headers: this.headers });
      return response.data.workflow_runs;
    } catch (error) {
      console.error('Error fetching workflow runs:', error.message);
      throw error;
    }
  }

  async syncPipelineData(owner, repo) {
    try {
      const runs = await this.fetchWorkflowRuns(owner, repo);
      
      for (const run of runs.slice(0, 10)) { // Last 10 runs
        // Save to MongoDB
        await PipelineLog.findOneAndUpdate(
          { runId: run.id },
          {
            workflowName: run.name,
            runId: run.id,
            status: run.status,
            conclusion: run.conclusion,
            branch: run.head_branch,
            commitMessage: run.head_commit?.message || 'N/A',
            triggeredBy: run.triggering_actor?.login || 'Unknown',
            startedAt: new Date(run.run_started_at),
            completedAt: run.updated_at ? new Date(run.updated_at) : null,
            duration: this.calculateDuration(run.run_started_at, run.updated_at)
          },
          { upsert: true, new: true }
        );

        // Save to MySQL
        await BuildMetadata.findOrCreate({
          where: { runId: run.id },
          defaults: {
            repository: `${owner}/${repo}`,
            buildNumber: run.run_number,
            testsPassed: Math.floor(Math.random() * 100), // Simulated
            testsFailed: Math.floor(Math.random() * 10),
            codeCoverage: (Math.random() * 30 + 70).toFixed(2), // 70-100%
            artifactsGenerated: run.conclusion === 'success',
            deployedEnvironment: run.conclusion === 'success' ? 'staging' : null
          }
        });
      }

      return { success: true, synced: runs.length };
    } catch (error) {
      console.error('Sync error:', error);
      throw error;
    }
  }

  calculateDuration(start, end) {
    if (!end) return null;
    return Math.floor((new Date(end) - new Date(start)) / 1000);
  }
}

module.exports = new GitHubService();