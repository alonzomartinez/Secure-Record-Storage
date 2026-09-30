# Secure Record Storage

This project is a backend API that uses Express, MongoDB, Mongoose, and JWT authentication.

The purpose of this is to make sure users can only access and change their own notes.

## What This Project Does

* Allows users to register and log in.
* Uses JWT tokens for authentication.
* Allows authenticated users to create notes.
* Users can only see their own notes.
* Users can update their own notes.
* Users cannot update another user's notes.
* Users can delete their own notes.
* Users cannot delete another user's notes.

## Install

Make sure you have **Node.js** and **MongoDB**.

After downloading the project, run:

```bash
npm install
```

The project uses these main packages:

```bash
npm install express mongoose dotenv jsonwebtoken bcryptjs
```

For development with Nodemon:

```bash
npm install --save-dev nodemon
```

If these packages are already listed in `package.json`, running `npm install` is enough.

## Environment Variables

Create a `.env` file in the main project folder.

Add the MongoDB connection string and JWT secret used by the project.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not share your real `.env` values or commit the `.env` file to GitHub.

## Run the Project

To start the server normally:

```bash
node server.js
```

If the project has the Nodemon development script, you can use:

```bash
npm run dev
```

Nodemon automatically restarts the server when you make changes.

## Testing

The API can be tested using Postman or another API testing tool.

The main things tested for this lab were:

* Registering a user
* Logging in and receiving a JWT
* Creating a note
* Getting the user's notes
* Updating a user's own note
* Preventing a user from updating another user's note
* Deleting a user's own note
* Preventing a user from deleting another user's note

## Lab Reflection

This lab helped me understand how authentication and authorization work together. JWT authentication is used to identify the logged-in user, while authorization makes sure that user can only access their own notes.

I also practiced using the logged-in user's ID when creating notes and checking ownership when updating or deleting notes.
