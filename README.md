# Xpert Group Cat App

An Angular application for managing and displaying cat breeds information with user authentication.

## Features

- Cat Breed Management
  - View list of available cat breeds
  - Display breed details and images in a carousel
  - Search cat breeds by name
  - Show breed information in a table format

- User Authentication
  - Login system
  - User registration
  - Protected routes with authentication guard
  - User profile management

## Prerequisites

- Node.js (v16 or higher)
- Angular CLI
- npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd xpert-group-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── cat-breeds/
│   │   ├── cat-search/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── user-profile/
│   ├── guards/
│   ├── services/
│   └── models/
├── environments/
├── assets/
└── styles/
```

## Available Scripts

- `ng serve` - Starts the development server
- `ng build` - Builds the project
- `ng test` - Runs unit tests
- `ng lint` - Runs code linting

## API Endpoints

- GET `/api/cats/breeds` - Get list of all cat breeds
- GET `/api/cats/breeds/{breedId}` - Get specific breed details
- GET `/api/cats/breeds/search` - Search cat breeds
- GET `/api/images/imagesbybreedid/{breedId}` - Get images for a breed
- POST `/api/users/register` - Register new user
- POST `/api/users/login` - User login

## Technologies Used

- Angular
- TypeScript
- Angular Material
- RxJS
- Jasmine/Karma (Testing)
- Material Design

## License

MIT License
