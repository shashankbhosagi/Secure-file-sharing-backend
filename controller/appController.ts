import { Request, Response } from "express";

// Post request creates user and returns private key of user
export const registerUser = (req: Request, res: Response) => {
  res.json({ msg: "register user route works" });
};

// Post request accepts file content and creates encrypted file
export const createFile = (req: Request, res: Response) => {
  res.json({ msg: "create file route works" });
};

// post request accepts username and adds it to files so that he can view it
export const addUser = (req: Request, res: Response) => {
  res.json({ msg: "add user route works" });
};

// get request shows all the files
export const showFiles = (req: Request, res: Response) => {
  res.json({ msg: "show file route works" });
};
