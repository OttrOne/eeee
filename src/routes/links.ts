import express from 'express';
import Link from '../models/link';
import validUrl from './../valid-url';

const router = express.Router();

router.get('/', async (req, res) => {

    res.json(await Link.find());
});

router.post('/', async (req, res) => {

    if (!validUrl(req.body.full, { strict: true, protocols: ['http', 'https'] })) return res.sendStatus(400);
    await Link.create({ full: req.body.full });
    res.sendStatus(201)
});

export default router;
