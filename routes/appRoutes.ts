import express from "express";
import {
  registerUser,
  createFile,
  addUser,
  showFilesById,
  showAllFiles,
} from "../controller/appController";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/create-file").post(createFile);
router.route("/add-user/:fileId").post(addUser);
router.route("/files").get(showFilesById);
router.route("/files/all").get(showAllFiles);

export default router;
