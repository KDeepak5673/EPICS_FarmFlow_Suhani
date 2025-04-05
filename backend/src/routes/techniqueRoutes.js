const express = require("express");
const {
    createTechnique,
    getAllTechniques,
    getSavedTechniques,
    searchTechniques,
    getRecommendedTechniques
  } = require("../controllers/techniqueController");const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, createTechnique);
router.get("/", getAllTechniques);                      // Get all techniques
router.get("/saved/:userId", getSavedTechniques);       // Get saved techniques for user
router.get("/search", searchTechniques);                // Search techniques
router.get("/recommended", getRecommendedTechniques);   // Get recommended techniques

module.exports = router;
