import express from "express";
import {
  registerUser,
  createFile,
  addUser,
  showFiles,
} from "../controller/appController";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/create-file").post(createFile);
router.route("/add-user/:fileId").post(addUser);
router.route("/files").get(showFiles);

export default router;
