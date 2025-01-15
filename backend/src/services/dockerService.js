const Docker = require('dockerode');
const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

async function fetchDockerLogs(containerName) {
    try {
        const container = docker.getContainer(containerName);
        const logs = await container.logs({
            stdout: true,
            stderr: true,
            follow: false,
        });

        return logs.toString(); // Convert logs to string format
    } catch (error) {
        console.error(`[Docker Service] Error fetching logs for container ${containerName}:`, error.message);
        throw error;
    }
}

module.exports = {
    fetchDockerLogs,
};
