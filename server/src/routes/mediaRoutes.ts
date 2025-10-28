import { Router } from "express";
import {
  createMedia,
  getMediaList,
  updateMedia,
  deleteMedia
} from "../controllers/mediaController";

const router = Router();

router.post("/newMedia", createMedia);
router.get("/getMedia", getMediaList);
router.put("/update/:id", updateMedia);
router.delete("/delete/:id", deleteMedia);

export default router;