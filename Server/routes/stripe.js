const router = require("express").Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51LRsCYSEIfVUgyYn4RIR68QU3uBu0vcIUef3hrR40I5J9IjwqVFQ6JNNIeAzKAddLH2KfBBlpxt9PaKVtzfuhoJY007wcr8u1g');



router.post("/payment", (req, res) => {

  res.status(200).json({payment:"succeed"});
  
});

module.exports = router;


