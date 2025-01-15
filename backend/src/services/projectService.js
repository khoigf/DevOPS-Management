const Project = require('../models/Project');

/**
 * Lấy danh sách dự án có trạng thái 1 hoặc 2 để chạy scheduler
 * @returns {Promise<Array>} Danh sách các dự án
 */
async function getProjectsForSchedule() {
    try {
        const projects = await Project.find({
            current_status: { $in: ['1', '2'] },
            owner: { $ne: null },
        });

        return projects.map((project) => ({
            project_id: project._id,
            owner: project.owner,
            repo: project.repo,
        }));
    } catch (error) {
        console.error('[ProjectService] Error fetching projects:', error.message);
        throw error;
    }
}

module.exports = {
    getProjectsForSchedule,
};
