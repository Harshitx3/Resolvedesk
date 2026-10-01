const getHealth = (req, res) => {
  res.status(200).json({
    service: 'resolvedesk-api-gateway',
    status: 'ok',
  });
};

module.exports = {
  getHealth,
};
