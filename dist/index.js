"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const luxon_1 = require("luxon");
function calculateProbability(lastPeriodDate) {
    // Calculate the start and end dates of the fertile window
    const startDate = luxon_1.DateTime.fromISO(lastPeriodDate).plus({ days: 9 });
    const endDate = luxon_1.DateTime.fromISO(lastPeriodDate).plus({ days: 19 });
    // Check if the current date falls within the fertile window
    const currentDate = luxon_1.DateTime.now();
    if (currentDate >= startDate && currentDate <= endDate) {
        return 0.15; // Example probability
    }
    else {
        return 0.02; // Example probability
    }
}
// Create an instance of Express
const app = (0, express_1.default)();
// Define a route for calculating the probability of pregnancy
app.get('/calculate-probability', (req, res) => {
    const lastPeriodDate = req.query.lastPeriodDate;
    // Perform the necessary calculations here to determine the probability
    const probability = calculateProbability(lastPeriodDate);
    // Return the result as JSON
    res.json({ probability });
});
// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
