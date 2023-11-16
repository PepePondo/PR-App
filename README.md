# Work in Progress on a local PR Ranking App for OffStage Malaysia.

## Included frameworks and/or libraries:

- Svelte (Frontend)
- SvelteKit
- Flowbite Svelte (UI framework + blocks)
- Tauri (For Desktop App Functionality)
- TailWindCSS (Basic CSS Utilities)

The current implementation is as barebones as it gets. This is a proof of concept of making a desktop App quickly with existing UI building blocks and a frontend to make a useful desktop app

## Features left to implement:

- [ ] CRUD operations
- [ ] Database FETCH and POST
- [ ] Head to Head comparison tool
- [ ] All data points are actually relevant
- [ ] Glicko2 algorithm

# How to use this repository

Just clone the repo to your local computer and VSCode. Tag me on Discord if you want repository collaboration access.

## Terminal commands:

- Run web development environment
  - pnpm run dev
- Run as Tauri desktop App dev environment
  - pnpm run tauri dev
- Build production ready webpage
  - pnpm run build
- Build production ready desktop app
  - pnpm run tauri build

(WIP)

# Backend Server

## Description

This is a backend server for a list of players using Express and MongoDS

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000/players` in your browser

## Usage

1. Open `http://localhost:3000/players` in your browser
2. Use Postman to test the routes

## Credits

1. [Express](https://expressjs.com/)
2. [Mongoose](https://mongoosejs.com/)
3. [MongoDB](https://www.mongodb.com/)
4. [Postman](https://www.postman.com/)
5. [dotenv](https://www.npmjs.com/package/dotenv)
6. [cors](https://www.npmjs.com/package/cors)
7. [body-parser](https://www.npmjs.com/package/body-parser)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Questions

If you have any questions, please contact me at [
](mailto:)

You can find more of my work at [GitHub]()
