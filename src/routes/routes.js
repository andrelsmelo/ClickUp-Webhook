const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.get('/is-alive', (req, res) => {
  res.status(200).json({ message: 'API is alive' });
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is alive' });
});

router.post('/webhook', webhookController.handleWebhook);

module.exports = router;
