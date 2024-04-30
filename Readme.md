## Overview

 This project is a simple blog application built using Node.js, Express, and MongoDB. It allows users to create, read, update, and delete blogs. The application also supports commenting on blogs. Additionally, the application includes user registration and login functionality using JWT (JSON Web Tokens) for authentication.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install` in the project directory.
3. Set up a MongoDB instance and update the `MONGODB_URI` environment variable in the `.env` file with your MongoDB connection string.
4. Update the `JWT_SECRET` environment variable in the `.env` file with your desired secret key for generating JWT tokens.
5. Start the server by running `npm start`.

## Routes

The following routes are available in the application:

- `GET /`: Retrieve all blogs.
- `GET /:blogId`: Retrieve a specific blog by id.
- `POST /create/:uid`: Create a new blog.
- `DELETE /delete/:uid/:blogId`: Delete a blog.
- `PUT /update/:uid/:blogId`: Update a blog.
- `POST /comments/:uid/:blogId`: Add a comment to a blog.
- `POST /register`: Register a new user.
- `POST /login`: Log in a user and return a JWT token.

## Authentication

The `auth.js` file contains the routes and logic for user registration and login. It uses JWT (JSON Web Tokens) for authentication. The following routes are available in the `auth.js` file:

- `POST /register`: Register a new user.
- `POST /login`: Log in a user and return a JWT token.

### Registering a New User

To register a new user, send a POST request to `/register` with the following JSON payload:

```json
{
  "username": "string",
  "password": "string"
}
```

The application will check if the username already exists in the database. If it does, it will return a message indicating that the username is already taken. Otherwise, it will hash the password using bcrypt and save the new user in the database.

### Logging In a User

To log in a user, send a POST request to `/login` with the following JSON payload:

```json
{
  "username": "string",
  "password": "string"
}
```

The application will check if the username exists in the database. If it does not, it will return a message indicating that the username does not exist. Otherwise, it will compare the provided password with the hashed password stored in the database. If the passwords match, it will generate a JWT token using the user's ID and the application's secret key. Finally, it will return the token and the user's ID in the response.

### JWT Token

The JWT token is a JSON Web Token that contains the user's ID. It is used to authenticate the user in the protected routes of the application. The token is generated using the `jsonwebtoken` library and the application's secret key, which is stored in the `.env` file.

### Middleware

The application uses the `verifyToken` middleware to protect the routes that require authentication. This middleware extracts the JWT token from the request headers, verifies its signature, and extracts the user's ID. If the token is valid, it sets the `req.user` property to the user's ID. Otherwise, it returns a 401 Unauthorized response.
