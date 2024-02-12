# Secure File Sharing Application

## Description

This is a secure file sharing application built with Node.js and Express. It allows users to register, create encrypted files, add other users to access those files, and view decrypted files shared with them. Each user has a public and private key pair for encryption and decryption.

## Features

- User registration with unique usernames
- File creation with encryption using AES-256-CBC algorithm
- Adding users to access files securely
- Viewing decrypted files shared with the user
- Viewing all files (encrypted and decrypted) accessible to the user

## Installation

1. Clone the repository: `git clone https://github.com/shashankbhosagi/oiconomos.git`
2. Navigate to the project directory: `cd oiconomos`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm run serve`
2. Start the production server: `npm run dev`
3. Access the API endpoints using a REST client like Postman or via a web browser.

## API Endpoints

### 1. User Registration

- **Endpoint**: `POST /register`
- **Request Body**: `{ "username": "<username>" }`
- Registers a new user with the given username and generates a public-private key pair for encryption and decryption.

### 2. Create File

- **Endpoint**: `POST /create-file`
- **Request Body**: `{ "content": "<file_content>", "username": "<owner_username>" }`
- Creates a new encrypted file with the provided content for the specified user.

### 3. Add User to File

- **Endpoint**: `POST /add-user/:fileId`
- **Request Params**: `fileId` (ID of the file)
- **Request Body**: `{ "username": "<new_user>" }`
- Adds a new user to access the specified file securely.

### 4. View File by ID

- **Endpoint**: `GET /show-file/:fileId`
- **Request Params**: `fileId` (ID of the file)
- **Request Body**: `{ "username": "<username>" }`
- Views the content of the specified file, decrypted for the authorized user.

### 5. View All Files

- **Endpoint**: `GET /show-all-files`
- **Request Body**: `{ "username": "<username>" }`
- Views all files accessible to the authorized user, with decrypted content for files shared with them.

## Technologies Used

- Node.js
- Express.js
- Typescript
- Crypto library for encryption and decryption

## Contributors

- [Shashank Bhosagi](https://github.com/shashankbhosagi)
