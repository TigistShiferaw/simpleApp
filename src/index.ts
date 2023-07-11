import express from 'express';
import { DateTime } from 'luxon';
import cors from 'cors';

function calculateProbability(lastPeriodDate: string): number {
  const currentDate = DateTime.now();

  // Calculate the number of days since the last period
  const daysSinceLastPeriod = currentDate.diff(DateTime.fromISO(lastPeriodDate), 'days').days;

  // Adjust the probability based on the number of days since the last period
  let probability = 0;

  if (daysSinceLastPeriod < 0) {
    // If the current date is before the last period, return a low probability
    probability = 0.02;
  } else if (daysSinceLastPeriod <= 7) {
    // High probability immediately after the last period
    probability = 0.3;
  } else if (daysSinceLastPeriod <= 14) {
    // Decreasing probability during the first half of the cycle
    probability = 0.1 + (0.2 * (14 - daysSinceLastPeriod)) / 7;
  } else if (daysSinceLastPeriod <= 21) {
    // Increasing probability during the second half of the cycle
    probability = 0.1 + (0.2 * (daysSinceLastPeriod - 14)) / 7;
  } else {
    // Low probability after day 21 of the cycle
    probability = 0.02;
  }

  return probability;
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
