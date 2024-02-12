import { Request, Response } from "express";
import crypto from "crypto";
const iv = crypto.randomBytes(16);

interface User {
  publicKey: string;
  privateKey: string;
}

interface EncryptedFile {
  fileId: String;
  content: String;
  encryptedKeys: { [username: string]: string };
  owner: string;
}

const users: { [username: string]: User } = {};
const encryptedFiles: { [fileId: string]: EncryptedFile } = {};

// Post request, creates user and returns private key of user
export const registerUser = (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required !" });
    }
    if (users[username]) {
      return res.status(400).json({ error: "Username already exist" });
    }

    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    users[username] = { publicKey, privateKey };

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registering user : ", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

// Post request accepts file content and creates encrypted file
export const createFile = (req: Request, res: Response) => {
  try {
    const { content, username } = req.body;

    if (!content || !username) {
      return res
        .status(400)
        .json({ error: "File content and username are required !" });
    }

    if (!users[username]) {
      return res.status(400).json({ error: "User not found" });
    }

    const fileId = crypto.randomBytes(3).toString("hex");

    const symmetricKey = crypto.randomBytes(32);

    const cipher = crypto.createCipheriv("aes-256-cbc", symmetricKey, iv);
    let encryptedContent = cipher.update(content, "utf8", "base64");
    encryptedContent += cipher.final("base64");

    const encryptedKey = crypto
      .publicEncrypt(users[username].publicKey, symmetricKey)
      .toString("base64");

    encryptedFiles[fileId] = {
      fileId,
      content: encryptedContent,
      encryptedKeys: { [username]: encryptedKey },
      owner: username,
    };

    return res
      .status(201)
      .json({ message: "FIle created successfully !", fileId });
  } catch (error) {
    console.error("Error creating file : ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// post request accepts username and adds it to files so that he can view it
export const addUser = (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    const { username } = req.body;
    const owner = req.headers["owner-username"];

    if (!fileId || !username) {
      res.status(400).json({ error: "File Id and username is required" });
    }

    if (!owner) {
      res.status(400).json({ error: "Owner field is required" });
    }

    if (!users[username]) {
      console.log("first");
      return res.status(400).json({ error: "User not found" });
    }

    if (!encryptedFiles[fileId]) {
      return res.status(404).json({ error: "File not found" });
    }

    const fileData: EncryptedFile = encryptedFiles[fileId];

    if (fileData.owner != owner) {
      return res
        .status(403)
        .json({ error: "Cannot modify the file unauthorised access" });
    }

    if (fileData.encryptedKeys[username]) {
      return res
        .status(400)
        .json({ error: "User already has access to the file" });
    }
    const ownerUsername = encryptedFiles[fileId].owner;
    const symmetricKey = crypto.privateDecrypt(
      users[ownerUsername].privateKey,
      Buffer.from(fileData.encryptedKeys[ownerUsername], "base64")
    );
    const encryptedKey = crypto
      .publicEncrypt(users[username].publicKey, symmetricKey)
      .toString("base64");

    encryptedFiles[fileId].encryptedKeys[username] = encryptedKey;

    return res
      .status(200)
      .json({ message: "User added successfully to access the file" });
  } catch (error) {
    console.error("Error adding user to file : ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get request shows all the files
export const showFilesById = (req: Request, res: Response) => {
  try {
    const fileId = req.params.fileId as string;
    const username = req.query.username as string;

    if (!fileId || !username) {
      return res.status(400).json({ error: "File Id and username required " });
    }

    if (!encryptedFiles[fileId]) {
      return res.status(404).json({ error: "File not found" });
    }
    const fileData: EncryptedFile = encryptedFiles[fileId];
    if (!fileData.encryptedKeys[username]) {
      return res.status(403).json({ error: "User cannot access this file" });
    }

    const decryptedKey = crypto.privateDecrypt(
      users[username].privateKey,
      Buffer.from(fileData.encryptedKeys[username], "base64")
    );

    const decipher = crypto.createDecipheriv("aes-256-cbc", decryptedKey, iv);

    let decryptedContent = decipher.update(
      fileData.content.toString(),
      "base64",
      "utf8"
    );
    decryptedContent += decipher.final("utf8");

    return res.status(200).json({ content: decryptedContent });
  } catch (error) {
    console.error("Error showing file : ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get request to view all files
export const showAllFiles = (req: Request, res: Response) => {
  try {
    const username = req.query.username as string;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const allFiles = Object.values(encryptedFiles).map((file) => {
      if (
        file.owner === username ||
        file.encryptedKeys.hasOwnProperty(username)
      ) {
        const fileId = file.fileId.toString();
        const fileData: EncryptedFile = encryptedFiles[fileId];
        const decryptedKey = crypto.privateDecrypt(
          users[username].privateKey,
          Buffer.from(fileData.encryptedKeys[username], "base64")
        );

        const decipher = crypto.createDecipheriv(
          "aes-256-cbc",
          decryptedKey,
          iv
        );

        let decryptedContent: string = decipher.update(
          fileData.content.toString(),
          "base64",
          "utf8"
        );
        decryptedContent += decipher.final("utf8");
        return {
          fileId: file.fileId,
          "Owner of the file": file.owner,
          content: decryptedContent,
        };
      } else {
        return {
          fileId: file.fileId,
          "Owner of the file": file.owner,
          content: file.content,
        };
      }
    });

    return res.status(200).json(allFiles);
  } catch (error) {
    console.error("Error fetching all files:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
