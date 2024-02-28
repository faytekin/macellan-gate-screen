# Macellan Gate Screen

This repository contains the frontend code for the Macellan SuperApp office entrance screens. It's a React application integrated with a Laravel backend, utilizing Pusher for real-time socket event handling. The system listens for socket events emitted by the Laravel backend through Pusher, specifically designed to display the name of individuals entering the office in real-time on the screens. Laravel Echo is utilized within the React application to efficiently handle and display these real-time updates.

## Installation

```
cp .env.example .env

yarn install
yarn dev
```


## Production

```
yarn build
```
