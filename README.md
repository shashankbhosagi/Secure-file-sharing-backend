# Secure File Sharing Application

## Description

This is a secure file sharing application built with Typescript, Nodejs and Express. It allows users to register, create encrypted files, add other users to access those files, and view decrypted files shared with them. Each user has a public and private key pair for encryption and decryption.

## Features

- User registration with unique usernames
- File creation with encryption using AES algorithm
- Adding users to access files securely
- Viewing decrypted files shared with the user
- Viewing all files (encrypted and decrypted) accessible to the user

## Installation

1. Clone the repository: `git clone https://github.com/shashankbhosagi/Secure-file-sharing-backend.git`
2. Navigate to the project directory: `cd oiconomos`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm run serve`
2. Start the production server: `npm run dev`
3. Access the API endpoints using a REST client like Postman or via a web browser.

## API Endpoints:

### 1. User Registration:

- **Endpoint:** `POST /api/v1/register`
- **Description:** Registers a new user and generates a public-private key pair for secure file sharing.
- **Request Body:** `{ "username": "example_user" }`
- **Response:** `{ "message": "User registered successfully" }`

### 2. File Creation:

- **Endpoint:** `POST /api/v1/create-file`
- **Description:** Creates a new encrypted file with the provided content and associates it with the user.
- **Request Body:** `{ "content": "file_content", "username": "owner_username" }`
- **Response:** `{ "message": "File created successfully", "fileId": "unique_file_id" }`

### 3. Add User to File:

- **Endpoint:** `POST /api/v1/add-user/:fileId`
- **Description:** Adds a user to the access list of the specified file, allowing them to decrypt and access the file.
- **Request Body:** `{ "username": "new_user_to_add" }`
- **Request Headers:** `{ "owner-username": "owner_username" }`
- **Response:** `{ "message": "User added successfully to access the file" }`

### 4. Get File by ID:

- **Endpoint:** `GET /api/v1/files/:fileId`
- **Description:** Retrieves the content of the specified file using the file ID. The user must have access to the file to view its content.
- **Request Parameters:** `fileId`
- **Request Query:** `username`
- **Response:** `{ "content": "decrypted_file_content" }`

### 5. View All Files:

- **Endpoint:** `GET /api/v1/all-files/`
- **Description:** Retrieves all files accessible to the specified user, including files owned by the user and files shared with the user.
- **Request Headers:** `{ "username": "example_user" }`
- **Response:** `[ { "fileId": "unique_file_id", "Owner of the file": "file_owner_username", "content": "decrypted_file_content" }, ...]`

## Technologies Used

- Node.js
- Express.js
- Typescript
- Crypto library for encryption and decryption

## Contributors

- [Shashank Bhosagi](https://github.com/shashankbhosagi)
