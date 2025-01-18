const Docker = require('dockerode');
const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

async function fetchDockerLogs(containerName) {
    try {
        // Lấy đối tượng container
        const container = docker.getContainer(containerName);

        // Kiểm tra container có tồn tại và đang chạy không
        const containerInfo = await container.inspect();
        if (!containerInfo.State.Running) {
            console.log(`[Docker Service] Container ${containerName} is not running. Skipping logs.`);
            return null; // Không thực hiện gì nếu container không chạy
        }

        // Lấy logs nếu container đang chạy
        const logs = await container.logs({
            stdout: true,
            stderr: true,
            follow: false,
        });

        return logs.toString(); // Chuyển logs sang chuỗi và trả về
    } catch (error) {
        // Xử lý lỗi container không tồn tại hoặc lỗi khác
        if (error.statusCode === 404) {
            console.log(`[Docker Service] Container ${containerName} does not exist. Skipping logs.`);
            return null;
        }

        console.error(`[Docker Service] Error fetching logs for container ${containerName}:`, error.message);
        return null; // Trả về null để không làm dừng chương trình
    }
}

module.exports = {
    fetchDockerLogs,
};
