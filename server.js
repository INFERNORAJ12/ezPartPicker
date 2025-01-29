const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Set up the Google Generative AI client
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyBQcT-D24RyBA3L8PqEugWBmrnYvlavAHU";  
const genAI = new GoogleGenerativeAI(apiKey);

// Endpoint to handle PC build generation
app.post('/generate-build', async (req, res) => {
    const { currency, amount } = req.body;

    if (!currency || !amount) {
        return res.status(400).json({ error: 'Currency and amount are required.' });
    }

    const systemInstruction = `
        You will only list out the parts of the PC with their full brand name like for example i5 12400f, Ryzen 5 5500, etc., with their price. 
        Ensure the parts are compatible, and if no GPU fits the budget, add a CPU with integrated graphics.
        Include the brand names like ASUS, MSI, Gigabyte, etc.
        PC should include CPU, motherboard, RAM, storage, case, PSU, and GPU (if it fits the budget).
        Provide a build for under or exactly ${amount} ${currency}.
    `;

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
        systemInstruction,
    });

    try {
        const chatSession = model.startChat({
            generationConfig: {
                temperature: 0,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 1024,
            },
            history: [
                { role: 'user', parts: [{ text: `${amount} ${currency}` }] },
            ],
        });

        const result = await chatSession.sendMessage('Generate build');
        res.json({ result: result.response.text() });
    } catch (error) {
        console.error('Error generating PC build:', error);
        res.status(500).json({ error: 'Failed to generate PC build.' });
    }
});

// Serve static files for the frontend
app.use(express.static(__dirname));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
