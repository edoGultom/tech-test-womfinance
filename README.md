# React Native Mobile App - Technical Test

A professional React Native mobile application built with CLI, featuring authentication, API integration, and UI/UX design.

## Features

### 1. Authentication (Login Screen)
- Email and password validation
- JWT-based authentication with 1-hour expiration
- Secure token storage using AsyncStorage
- Auto-redirect for authenticated users
- Form validation with error messages

### 2. Home Screen
- Displays user email in header
- Fetches data from JSONPlaceholder API (users endpoint)
- FlatList implementation with:
  - Pull-to-refresh functionality
  - Loading states
  - Error states
  - Empty states
- Logout functionality
- Navigation to user details

### 3. Detail Screen
- Shows comprehensive user information
- Reusable UserCard component (same as Home)
- Detailed address, company, and contact information
- Proper error handling and loading states
- Back navigation

## Tech Stack

- **Framework**: React Native CLI
- **HTTP Client**: Axios
- **Storage**: MKKV (react-native-mmkv)
- **Icons**: Material Icon
- **Language**: TypeScript
- **API**: JSONPlaceholder (public REST API) 

## Requirements

- Node.js ≥ 18
- React Native CLI
- Android Studio / Xcode
- Java JDK 17+

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start Metro bundler & Android:
```bash
npm run android
```

3. Start Metro bundler & IOS:
```bash
npm run ios
```

## Usage

### Login
1. Enter any email address (e.g., test@example.com)
2. Enter password (minimum 6 characters)
3. Click "Sign In"

The app generates a JWT token that expires in 1 hour.

## API Endpoints

- **Base URL**: https://jsonplaceholder.typicode.com
- **Users List**: GET /users
- **User Detail**: GET /users/:id
