const schedule = require('node-schedule');
const { getProjectsForSchedule } = require('./services/projectService'); // Import projectService
const { fetchGitHubLogs } = require('./services/githubService');
const { fetchDockerLogs } = require('./services/dockerService');
const { parseLogs } = require('./utils/logParser');
const { createIssuesFromLogs } = require('./services/issueService');

const container_name = process.env.DOCKER_CONTAINER_NAME;

async function scheduleAllProjects() {
    
    console.log('Starting scheduler...');
    try {
        // Lấy danh sách dự án từ database
        const projects = await getProjectsForSchedule();

        projects.forEach(({ project_id, owner, repo }) => {
            if (!owner || !repo) {
                console.error(`[Scheduler] Invalid project: ${project_id}`);
                return;
            }
            // Lịch cho GitHub Logs
            schedule.scheduleJob(`GitHubLogs-${project_id}`, '*/5 * * * *', async () => {
                console.log(`[Scheduler] Fetching GitHub logs for project: ${repo}`);
                const logs = await fetchGitHubLogs(owner, repo);
                const parsedLogs = parseLogs(logs, 'GitHub Actions', project_id);
                await createIssuesFromLogs(parsedLogs, owner, repo);
                console.log(`[Scheduler] GitHub logs processed for project: ${repo}`);
            });

            // Lịch cho Docker Logs
            schedule.scheduleJob(`DockerLogs-${project_id}`, '*/5 * * * *', async () => {
                console.log(`[Scheduler] Fetching Docker logs for project: ${repo}`);
                const logs = await fetchDockerLogs(container_name);
                const parsedLogs = parseLogs(logs, 'Docker', project_id);
                await createIssuesFromLogs(parsedLogs, owner, repo);
                console.log(`[Scheduler] Docker logs processed for project: ${repo}`);
            });
            console.log(`[Scheduler] Valid project: ${project_id}`);
        });
    } catch (error) {
        console.error('[Scheduler] Error initializing schedules:', error.message);
    }
}

module.exports = {
    scheduleAllProjects,
};
