const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const glicko2 = require('glicko2');
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/smash_ranking', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Define MongoDB Schema
const playerSchema = new mongoose.Schema({
	name: String,
	rating: { type: Number, default: 1500 },
	rd: { type: Number, default: 350 },
	vol: { type: Number, default: 0.06 }
});

const Player = mongoose.model('Player', playerSchema);

// Glicko2 setup
const glicko = new glicko2.Glicko2();

// Express middleware
app.use(bodyParser.json());

// Get all players
app.get('/api/players', async (req, res) => {
	try {
		const players = await Player.find();
		res.json(players);
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// Update player ratings using Glicko2
app.post('/api/update-ratings', async (req, res) => {
	try {
		const matches = req.body.matches; // Assuming matches is an array of match results

		// Convert match results to Glicko2 format
		const results = matches.map((match) => {
			const player1 = glicko.makePlayer(match.player1.rating, match.player1.rd, match.player1.vol);
			const player2 = glicko.makePlayer(match.player2.rating, match.player2.rd, match.player2.vol);

			return [[player1], [player2], match.result];
		});

		// Update ratings
		glicko.updateRatings(results);

		// Save updated ratings to the database
		for (let i = 0; i < results.length; i++) {
			const player1 = results[i][0][0];
			const player2 = results[i][1][0];

			await Player.findOneAndUpdate(
				{ _id: matches[i].player1.id },
				{ rating: player1.getRating(), rd: player1.getRd() }
			);

			await Player.findOneAndUpdate(
				{ _id: matches[i].player2.id },
				{ rating: player2.getRating(), rd: player2.getRd() }
			);
		}

		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
