const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage (use database in production)
let threats = [];
let logs = [];
let systemStats = {
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
    blocked: 0,
    lastScan: null
};

// Serve the main dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Get system status
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'online', 
        message: 'Cybersecurity Dashboard is running!',
        n8nConnected: !!process.env.N8N_WEBHOOK_URL,
        uptime: process.uptime()
    });
});

// API: Get all threats
app.get('/api/threats', (req, res) => {
    res.json({ 
        success: true, 
        count: threats.length,
        threats: threats.slice(0, 50) // Return last 50
    });
});

// API: Create new threat
app.post('/api/threats', async (req, res) => {
    try {
        const threat = {
            id: Date.now() + Math.random(),
            type: req.body.type || 'Unknown',
            severity: req.body.severity || 'low',
            ip: req.body.ip || 'Unknown',
            blocked: req.body.blocked || false,
            timestamp: new Date().toISOString(),
            details: req.body.details || {}
        };

        // Add to storage
        threats.unshift(threat);
        threats = threats.slice(0, 100); // Keep last 100

        // Update stats
        systemStats.total++;
        systemStats[threat.severity]++;
        if (threat.blocked) systemStats.blocked++;
        systemStats.lastScan = new Date().toISOString();

        // Log the event
        addLog(`Threat detected: ${threat.type} from ${threat.ip}`, 
               threat.severity === 'high' ? 'danger' : 'warning');

        // Trigger n8n webhook if configured
        if (process.env.N8N_WEBHOOK_URL) {
            await triggerN8nWebhook(threat);
        }

        res.json({ success: true, threat });
    } catch (error) {
        console.error('Error creating threat:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Get activity logs
app.get('/api/logs', (req, res) => {
    res.json({ 
        success: true, 
        count: logs.length,
        logs: logs.slice(0, 100)
    });
});

// API: Add log entry
app.post('/api/logs', (req, res) => {
    const log = addLog(req.body.message, req.body.type);
    res.json({ success: true, log });
});

// API: Get statistics
app.get('/api/stats', (req, res) => {
    res.json({ 
        success: true, 
        stats: systemStats 
    });
});

// API: Reset all data
app.post('/api/reset', (req, res) => {
    threats = [];
    logs = [];
    systemStats = {
        total: 0,
        high: 0,
        medium: 0,
        low: 0,
        blocked: 0,
        lastScan: null
    };
    addLog('System reset completed', 'info');
    res.json({ success: true, message: 'System reset successfully' });
});

// API: Test n8n connection
app.get('/api/test-n8n', async (req, res) => {
    if (!process.env.N8N_WEBHOOK_URL) {
        return res.json({ 
            success: false, 
            message: 'N8N_WEBHOOK_URL not configured' 
        });
    }

    try {
        const testThreat = {
            id: 'test-' + Date.now(),
            type: 'Test Connection',
            severity: 'low',
            ip: '127.0.0.1',
            blocked: true,
            timestamp: new Date().toISOString(),
            isTest: true
        };

        await triggerN8nWebhook(testThreat);
        res.json({ 
            success: true, 
            message: 'n8n webhook triggered successfully!' 
        });
    } catch (error) {
        res.json({ 
            success: false, 
            message: 'Failed to trigger n8n webhook',
            error: error.message 
        });
    }
});

// API: Export report
app.get('/api/export', (req, res) => {
    const report = {
        generatedAt: new Date().toISOString(),
        statistics: systemStats,
        threats: threats,
        logs: logs,
        systemInfo: {
            uptime: process.uptime(),
            nodeVersion: process.version,
            platform: process.platform
        }
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=security-report-${Date.now()}.json`);
    res.json(report);
});

// Helper: Add log entry
function addLog(message, type = 'info') {
    const log = {
        id: Date.now() + Math.random(),
        message,
        type,
        timestamp: new Date().toISOString()
    };
    logs.unshift(log);
    logs = logs.slice(0, 100);
    console.log(`[${log.type.toUpperCase()}] ${message}`);
    return log;
}

// Helper: Trigger n8n webhook
async function triggerN8nWebhook(threat) {
    if (!process.env.N8N_WEBHOOK_URL) {
        console.log('N8N_WEBHOOK_URL not configured, skipping webhook');
        return;
    }

    try {
        const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
            event: 'threat_detected',
            timestamp: new Date().toISOString(),
            data: threat,
            severity: threat.severity,
            requiresAction: threat.severity === 'high'
        }, {
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.N8N_API_KEY || ''
            }
        });

        console.log('✅ n8n webhook triggered successfully');
        addLog('Alert sent to n8n automation system', 'success');
        return response.data;
    } catch (error) {
        console.error('❌ n8n webhook error:', error.message);
        addLog(`Failed to send alert to n8n: ${error.message}`, 'danger');
        throw error;
    }
}

// Start server
app.listen(PORT, () => {
    console.log('\n🔒 ================================');
    console.log('🚀 Cybersecurity Dashboard ONLINE!');
    console.log(`📊 Dashboard: http://localhost:${PORT}`);
    console.log(`🔌 API Status: http://localhost:${PORT}/api/status`);
    console.log(`🤖 n8n Integration: ${process.env.N8N_WEBHOOK_URL ? '✅ Enabled' : '❌ Disabled'}`);
    console.log('🔒 ================================\n');
    
    addLog('Cybersecurity monitoring system initialized', 'success');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    addLog('System shutdown initiated', 'info');
    process.exit(0);
});