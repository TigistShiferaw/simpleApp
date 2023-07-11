import express from 'express';
import { DateTime } from 'luxon';
import cors from 'cors';

function calculateProbability(lastPeriodDate: string): number {
  // Calculate the start and end dates of the fertile window
  const startDate = DateTime.fromISO(lastPeriodDate).plus({ days: 9 });
  const endDate = DateTime.fromISO(lastPeriodDate).plus({ days: 19 });

  // Check if the current date falls within the fertile window
  const currentDate = DateTime.now();
  if (currentDate < startDate || currentDate > endDate) {
    return 0.02; // Probability outside the fertile window
  }

  // Calculate the probability based on the day within the fertile window
  const daysPassed = currentDate.diff(startDate, 'days').days;
  const probability = 0.02 + (daysPassed * 0.02); // Example linear increase in probability

  return Math.min(0.3, probability); // Maximum probability capped at 0.3 (30%)
}

// Create an instance of Express
const app = express();

// Enable CORS for your frontend domain
app.use(cors());

// Define a route for calculating the probability of pregnancy
app.get('/calculate-probability', (req, res) => {
  const lastPeriodDate = req.query.lastPeriodDate as string;

  // Perform the necessary calculations here to determine the probability
  const probability = calculateProbability(lastPeriodDate);

  // Return the result as JSON
  res.json({ probability });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
