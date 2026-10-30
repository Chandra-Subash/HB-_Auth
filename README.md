# HBPLUS – Authentication App

HBPLUS is a cross-platform application developed using React Native and Expo. It provides a simple authentication system where users can register, verify their email addresses, log in and access a dashboard based on their account type.

The application uses Firebase Authentication to manage user accounts and authentication.

## Features

- User registration using email and password.
- Email verification before accessing the dashboard.
- Login using email and password.
- Google authentication on the web.
- Protected dashboard for authenticated users.
- Logout functionality.
- Basic role-based dashboard greetings.
- Cross-platform frontend using Expo.

## Technology Stack

- **Frontend:** React Native
- **Framework:** Expo
- **Navigation:** Expo Router
- **Authentication:** Firebase Authentication
- **Language:** JavaScript (JSX)

## User Roles

The current application uses email domains to determine the displayed role:

| Email domain | Role |
|---|---|
| @gmail.com | User |
| @hbplus.fit | Owner |

These roles are currently determined on the frontend for demonstration purposes. Production applications should validate roles using trusted backend logic or Firebase custom claims.



## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd HBPLUS-Authentication-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a Firebase project and enable:

- Email/Password authentication
- Google authentication

Add your Firebase web configuration in `src/firebase.js`.

### 4. Start the application

```bash
npx expo start
```

To run the web version, press `w` in the terminal.

To test on a mobile device, scan the Expo QR code using Expo Go. Email/password authentication is supported on Android; native Google sign-in still requires additional configuration.

## Authentication Flow

1. A new user registers with an email address and password.
2. Firebase creates the user account.
3. A verification email is sent.
4. The user verifies their email address.
5. The user logs in.
6. The application checks authentication status.
7. The dashboard displays the appropriate greeting based on the email domain.


