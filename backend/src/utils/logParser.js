const moment = require('moment');
const Log = require('../models/Log'); // Import schema Log
const mongoose = require('mongoose');

const SEVERITY_MAP = {
    INFO: 'low',
    SUCCESS: 'low',
    WARNING: 'medium',
    ERROR: 'high',
    FAILURE: 'high',
    CRITICAL: 'critical',
};

async function parseLogs(rawLogs, source, project_id) {
    if (typeof rawLogs !== 'string') {
        console.error('[Log Parser] rawLogs must be a string.');
        return [];
    }

    const parsedLogs = [];
    const logEntries = rawLogs.split('\n');

    for (const [index, line] of logEntries.entries()) {
        const level = Object.keys(SEVERITY_MAP).find((key) => line.includes(key)) || 'INFO';
        const message = line.trim();

        if (message) {
            const log = {
                project_id: new mongoose.Types.ObjectId(project_id),
                level: level.toLowerCase(),
                source,
                message,
                event_type: 'LogEvent',
                error_code: `E${100 + Object.values(SEVERITY_MAP).indexOf(SEVERITY_MAP[level])}`,
                timestamp: moment().toISOString(),
            };

            try {
                // Check if a log with the same properties already exists
                const existingLog = await Log.findOne({
                    project_id: log.project_id,
                    level: log.level,
                    message: log.message,
                });

                if (!existingLog) {
                    const newLog = new Log(log);
                    await newLog.save();
                    console.log(`[Log Parser] Log saved: ${message}`);
                } else {
                    console.log(`[Log Parser] Duplicate log skipped: ${message}`);
                }
            } catch (error) {
                console.error(`[Log Parser] Error processing log: ${error.message}`);
            }

            parsedLogs.push(log);
        }
    }

    return parsedLogs;
}

module.exports = {
    parseLogs,
};
