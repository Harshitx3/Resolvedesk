const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    service: 'resolvedesk-auth-service',
    status: 'ok',
  });
});

module.exports = router;
