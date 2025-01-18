require('dotenv').config();

async function fetchGitHubLogs(owner, repo) {
    const { Octokit } = await import('@octokit/rest');

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    try {
        const { data } = await octokit.actions.listWorkflowRunsForRepo({
            owner,
            repo,
            per_page: 1,
        });

        const latestRun = data.workflow_runs[0];
        console.log(`[GitHub Service] Latest run for ${repo}:`, latestRun);
        if (!latestRun) {
            console.warn(`[GitHub Service] No workflow runs found for project: ${repo}`);
            return '';
        }

        const { data: logData } = await octokit.actions.listJobsForWorkflowRun({
            owner,
            repo,
            run_id: latestRun.id,
        });
        let logs = '';
        for (const job of logData.jobs) {
            for (const step of job.steps) {
                logs += `Step: ${step.name} Status: ${step.conclusion}\n`;
            }
        }
        return logs;
    } catch (error) {
        console.error(`[GitHub Service] Error fetching logs for ${repo}:`, error.message);
        return null;
    }
}

module.exports = {
    fetchGitHubLogs,
};
