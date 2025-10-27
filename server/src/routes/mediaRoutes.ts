import { Router } from "express";
import {
  createMedia,
  getMediaList,
  updateMedia,
  deleteMedia
} from "../controllers/mediaController";

const router = Router();

router.post("/", createMedia);
router.get("/", getMediaList);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

export default router;