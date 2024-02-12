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

## API Endpoints

### 1. User Registration

- **Endpoint**: `POST /register`
- **Request Body**: `{ "username": "<username>" }`
- **Response**: `{ "message": "User registered successfully" }`

### 2. Create File

- **Endpoint**: `POST /create-file`
- **Request Body**: `{ "content": "<file_content>", "username": "<owner_username>" }`
- **Response**: `{ "message": "File created successfully !", "fileId": "<file_id>" }`

### 3. Add User to File

- **Endpoint**: `POST /add-user/:fileId`
- **Request Params**: `fileId` (ID of the file)
- **Request Body**: `{ "username": "<new_user>" }`
- **Response**: `{ "message": "User added successfully to access the file" }`

### 4. View File by ID

- **Endpoint**: `GET /show-file/:fileId`
- **Request Params**: `fileId` (ID of the file)
- **Request Body**: `{ "username": "<username>" }`
- **Response**: `{ "content": "<file_content>" }`

### 5. View All Files

- **Endpoint**: `GET /show-all-files`
- **Request Body**: `{ "username": "<username>" }`
- **Response**:
  ```json
  [
    {
      "fileId": "<file_id>",
      "Owner of the file": "<owner_username>",
      "content": "<file_content>"
    },
    {
      "fileId": "<file_id>",
      "Owner of the file": "<owner_username>",
      "content": "<file_content>"
    },
    ...
  ]
  ```

## Technologies Used

- Node.js
- Express.js
- Typescript
- Crypto library for encryption and decryption

## Contributors

- [Shashank Bhosagi](https://github.com/shashankbhosagi)
