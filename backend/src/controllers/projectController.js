const Project = require('../models/Project');
const Phase = require('../models/Phase');
const Member = require('../models/Member');
const Task = require('../models/Task');
const Tool = require('../models/Tool');
const Configuration = require('../models/Configuration');
const Issue = require('../models/Issue');
const Log = require('../models/Log');

// Create project
exports.createProject = async (req, res) => {
    const { user_id } = req.params;
    const { name, description, start_date, end_date, owner, repo } = req.body;

    try {
        const newProject = new Project({
            owner_id: user_id,
            name,
            description,
            owner,
            repo,
            start_date,
            end_date,
            current_status: 1 // Assuming 1 is the default status
        });

        await newProject.save();
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    const { project_id } = req.params;
    const { name, description, owner, repo, start_date, end_date, current_status } = req.body;

    try {
        await Project.findByIdAndUpdate(project_id, {
            name,
            description,
            owner,
            repo,
            start_date,
            end_date,
            current_status
        });

        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get list of projects for a user
exports.getAllProjects = async (req, res) => {
    const { user_id } = req.params;

    try {
        const projects = await Project.find({ owner_id: user_id });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get project info
exports.getProjectById = async (req, res) => {
    const { project_id } = req.params;

    try {
        const project = await Project.findById(project_id);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    const { project_id } = req.params;

    try {
        await Project.findByIdAndDelete(project_id);
        await Phase.findAndDelete({ project_id });
        await Member.findAndDelete({ project_id });
        await Task.findAndDelete({ project_id });
        await Tool.findAndDelete({ project_id });
        await Configuration.findAndDelete({ project_id });
        await Issue.findAndDelete({ project_id });
        await Log.findAndDelete({ project_id });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create phase
exports.createPhase = async (req, res) => {
    const { project_id } = req.params;
    const { name, description, start_date, end_date, status } = req.body;

    try {
        const newPhase = new Phase({
            project_id,
            name,
            description,
            start_date,
            end_date,
            status
        });

        await newPhase.save();
        res.status(201).json({ message: 'Phase created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update phase
exports.updatePhase = async (req, res) => {
    const { phase_id } = req.params;
    const { name, description, start_date, end_date, status } = req.body;

    try {
        await Phase.findByIdAndUpdate(phase_id, {
            name,
            description,
            start_date,
            end_date,
            status
        });

        res.status(200).json({ message: 'Phase updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get list of phases for a project
exports.getAllPhases = async (req, res) => {
    const { project_id } = req.params;

    try {
        const phases = await Phase.find({ project_id });
        res.status(200).json(phases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get phase info
exports.getPhaseById = async (req, res) => {
    const { phase_id } = req.params;

    try {
        const phase = await Phase.findById(phase_id);
        res.status(200).json(phase);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete phase
exports.deletePhase = async (req, res) => {
    const { phase_id } = req.params;

    try {
        await Phase.findByIdAndDelete(phase_id);
        res.status(200).json({ message: 'Phase deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Member management
exports.addMember = async (req, res) => {
    const { project_id } = req.params;
    const { name, role } = req.body;

    try {
        const newMember = new Member({ project_id, name, role });
        await newMember.save();
        res.status(201).json({ message: 'Member added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMember = async (req, res) => {
    const { member_id } = req.params;
    const { role } = req.body;

    try {
        await Member.findByIdAndUpdate(member_id, { role });
        res.status(200).json({ message: 'Member role updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllMembers = async (req, res) => {
    const { project_id } = req.params;

    try {
        const members = await Member.find({ project_id });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMemberById = async (req, res) => {
    const { member_id } = req.params;

    try {
        const member = await Member.findById(member_id);
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMember = async (req, res) => {
    const { member_id } = req.params;

    try {
        await Member.findByIdAndDelete(member_id);
        await Task.findAndDelete({ assigned_to: member_id });
        res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Task management
exports.addTaskToMember = async (req, res) => {
    const { project_id, member_id } = req.params;
    const { name, description, status } = req.body;

    try {
        const newTask = new Task({ project_id, assigned_to: member_id, name, description, status });
        await newTask.save();
        res.status(201).json({ message: 'Task created and assigned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { task_id } = req.params;
    const { name, description, status } = req.body;

    try {
        await Task.findByIdAndUpdate(task_id, { name, description, status });
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { task_id } = req.params;

    try {
        await Task.findByIdAndDelete(task_id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    const { project_id } = req.params;

    try {
        const tasks = await Task.find({ project_id }).populate('assigned_to');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    const { task_id } = req.params;

    try {
        const task = await Task.findById(task_id).populate('assigned_to');
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTasksByMember = async (req, res) => {
    const { member_id } = req.params;
    try {
        const tasks = await Task.find({ assigned_to: member_id }).populate('assigned_to');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Tool management
exports.addTool = async (req, res) => {
    const { project_id } = req.params;
    const { name, type, status } = req.body;

    try {
        const newTool = new Tool({ project_id, name, type, status });
        await newTool.save();
        res.status(201).json({ message: 'Tool created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTool = async (req, res) => {
    const { tool_id } = req.params;
    const { name, type, status } = req.body;

    try {
        await Tool.findByIdAndUpdate(tool_id, { name, type, status });
        res.status(200).json({ message: 'Tool updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTools = async (req, res) => {
    const { project_id } = req.params;

    try {
        const tools = await Tool.find({ project_id });
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getToolById = async (req, res) => {
    const { tool_id } = req.params;

    try {
        const tool = await Tool.findById(tool_id);
        res.status(200).json(tool);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTool = async (req, res) => {
    const { tool_id } = req.params;

    try {
        await Tool.findByIdAndDelete(tool_id);
        res.status(200).json({ message: 'Tool deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Configuration management
exports.addConfiguration = async (req, res) => {
    const { project_id } = req.params;
    const { name, value } = req.body;
    const configuration = new Configuration({ project_id, name, value });
    try {
        await configuration.save();
        res.status(201).json({ message: 'Configuration added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllConfigurations = async (req, res) => {
    const { project_id } = req.params;

    try {
        const configurations = await Configuration.find({ project_id });
        res.status(200).json(configurations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getConfigurationById = async (req, res) => {
    const { config_id } = req.params;

    try {
        const configuration = await Configuration.findById(config_id);
        res.status(200).json(configuration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateConfiguration = async (req, res) => {
    const { config_id } = req.params;
    const { name, value } = req.body;

    try {
        await Configuration.findByIdAndUpdate(config_id, { name, value });
        res.status(200).json({ message: 'Configuration updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteConfiguration = async (req, res) => {
    const { config_id } = req.params;
    try {
        await Configuration.findByIdAndDelete(config_id);
        res.status(200).json({ message: 'Configuration deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Issue management
exports.getAllIssues = async (req, res) => {
    const { project_id } = req.params;

    try {
        const issues = await Issue.find({ project_id });
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getIssueById = async (req, res) => {
    const { issue_id } = req.params;

    try {
        const issue = await Issue.findById(issue_id);
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateIssue = async (req, res) => {
    const { issue_id } = req.params;
    const { status } = req.body;

    try {
        await Issue.findByIdAndUpdate(issue_id, { status });
        res.status(200).json({ message: 'Issue status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};