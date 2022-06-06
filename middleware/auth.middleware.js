const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  };

  try {
    console.log('req.headers', req.headers)
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Not Auth' })
    };

    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not Auth' })
  }
}