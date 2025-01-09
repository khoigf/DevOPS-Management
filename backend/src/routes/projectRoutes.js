const express = require('express');
const projectController = require('../controllers/projectController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Define routes
router.get('/projects/all/:user_id', authenticate, projectController.getAllProjects);
router.get('/projects/:project_id', authenticate, projectController.getProjectById);
router.post('/projects/:user_id', authenticate, projectController.createProject);
router.put('/projects/:project_id', authenticate, projectController.updateProject);
router.delete('/projects/:project_id', authenticate, projectController.deleteProject);

// Phase management routes
router.post('/projects/phases/:project_id', authenticate, projectController.createPhase);
router.put('/projects/phases/:phase_id', authenticate, projectController.updatePhase);
router.get('/projects/phases/all/:project_id', authenticate, projectController.getAllPhases);
router.get('/projects/phases/:phase_id', authenticate, projectController.getPhaseById);
router.delete('/projects/phases/:phase_id', authenticate, projectController.deletePhase);

// Member management routes
router.post('/projects/members/:project_id', authenticate, projectController.addMember);
router.put('/projects/members/:member_id', authenticate, projectController.updateMember);
router.get('/projects/members/all/:project_id', authenticate, projectController.getAllMembers);
router.get('/projects/members/:member_id', authenticate, projectController.getMemberById);
router.delete('/projects/members/:member_id', authenticate, projectController.deleteMember);

// Task management routes
router.post('/projects/tasks/:project_id/:member_id', authenticate, projectController.addTaskToMember);
router.put('/projects/tasks/:task_id', authenticate, projectController.updateTask);
router.delete('/projects/tasks/:task_id', authenticate, projectController.deleteTask);
router.get('/projects/tasks/all/:project_id', authenticate, projectController.getAllTasks);
router.get('/projects/tasks/:task_id', authenticate, projectController.getTaskById);

// Tool management routes
router.post('/projects/tools/:project_id', authenticate, projectController.addTool);
router.put('/projects/tools/:tool_id', authenticate, projectController.updateTool);
router.get('/projects/tools/all/:project_id', authenticate, projectController.getAllTools);
router.get('/projects/tools/:tool_id', authenticate, projectController.getToolById);
router.delete('/projects/tools/:tool_id', authenticate, projectController.deleteTool);

// Configuration management routes
router.post('/projects/config/:project_id', authenticate, projectController.addConfiguration);
router.get('/projects/config/all/:project_id', authenticate, projectController.getAllConfigurations);
router.get('/projects/config/:config_id', authenticate, projectController.getConfigurationById);
router.put('/projects/config/:config_id', authenticate, projectController.updateConfiguration);

// Issue management routes
router.get('/projects/issues/all/:project_id', authenticate, projectController.getAllIssues);
router.get('/projects/issues/:issue_id', authenticate, projectController.getIssueById);
router.put('/projects/issues/:issue_id', authenticate, projectController.updateIssue);

module.exports = router;