const { Router } = require('express');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware')
const config = require('config');
const shortid = require('shortid');
const router = Router();


router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code;

    const newLink = new Link({
      code, to, from, owner: req.user.userId
    })

    await newLink.save()

    res.status(200).json({ link: newLink })

  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong with creating' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong with link' })
  }
})

router.post('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong with link id' })
  }
})

module.exports = router;