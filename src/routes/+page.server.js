import { Client } from 'pg';
// import Glicko2 from 'glicko2';

// Glicko2 setup
// const glicko2 = new Glicko2();

// Glicko2 settings and init
const settings = {
	// tau : "Reasonable choices are between 0.3 and 1.2, though the system should
	//      be tested to decide which value results in greatest predictive accuracy."
	tau: 0.5,
	// rating : default rating
	rating: 1500,
	//rd : Default rating deviation
	//     small number = good confidence on the rating accuracy
	rd: 200,
	//vol : Default volatility (expected fluctation on the player rating)
	vol: 0.06
};
// const ranking = new glicko2.Glicko2(settings);

// var matches = [];

const client = new Client(
	'postgresql://offstage:pKWyZwxfPn3C5gsnK7aSGg@shield-onager-7202.8nk.cockroachlabs.cloud:26257/PRranking?sslmode=verify-full'
);

async (request) => {
	await client.connect();

	try {
		// Extract form data from the request
		const { name, alias, rating } = JSON.parse(request.body);

		// Perform Glicko2 operations
		// ...

		// Insert data into the database
		const result = await client.query(
			'INSERT INTO players (name, alias, rating, rd, vol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[name, alias, rating, settings.rd, settings.vol]
		);

		// Send the inserted data back as a response
		return {
			status: 200,
			body: JSON.stringify(result.rows[0]),
			headers: { 'Content-Type': 'application/json' }
		};
	} catch (error) {
		console.error('Error handling form data:', error);
		return {
			status: 500,
			body: JSON.stringify({ error: 'Server error' }),
			headers: { 'Content-Type': 'application/json' }
		};
	} finally {
		await client.end();
	}
};
