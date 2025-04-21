const express = require('express');
const router = express.Router();
const {insertSampleProducts,getProductStats,getProductAnalysis} = require("../controllers/product-controller")


router.post('/insert-sample-products', insertSampleProducts);
router.get("/stats",getProductStats)
router.get("/analysis",getProductAnalysis)

module.exports = router;
