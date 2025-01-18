const Issue = require('../models/Issue');

async function createIssuesFromLogs(parsedLogs, owner, repo) {
  const { Octokit } = await import('@octokit/rest');

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  if (!Array.isArray(parsedLogs) || parsedLogs.length === 0) {
    console.warn('createIssuesFromLogs: No logs to process');
    return;
  }

  for (const log in parsedLogs) {
    if (['error', 'warning'].includes(log.level)) {
      try {
        const githubResponse = await octokit.issues.create({
          owner,
          repo,
          title: `[${log.source}] ${log.message}`,
          body: `**Error Code**: ${log.error_code}\n**Log Message**: ${log.message}\n**Timestamp**: ${log.timestamp}`,
          labels: [log.source, 'auto-generated'],
        });

        console.log(`GitHub Issue Created: ${githubResponse.data.html_url}`);

        const issue = new Issue({
          project_id: log.project_id,
          log_id: log._id,
          description: log.message,
          severity: log.level,
          status: 0,
        });

        await issue.save();
        console.log(`Issue saved in DB: ${issue._id}`);
      } catch (error) {
        console.error(`Error creating GitHub issue: ${error.message}`);
      }
    }
  }
}

module.exports = { createIssuesFromLogs };
