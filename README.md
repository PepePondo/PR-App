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