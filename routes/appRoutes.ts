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
router.route("/files/:fileId").get(showFilesById);
router.route("/all-files").get(showAllFiles);

export default router;
