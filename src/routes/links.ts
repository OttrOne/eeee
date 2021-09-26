import express from 'express';
import { nanoid } from 'nanoid';
import { links } from './../storage';
import validUrl from './../valid-url';

const router = express.Router();

links.push({ short: nanoid(6), full: 'https://alex.ottr.one/', clicks: 0 })

router.get('/', (req, res) => {

    res.json(links);
});

router.post('/', (req, res) => {

    if (!validUrl(req.body.full, { strict: true, protocols: ['http', 'https'] })) return res.sendStatus(400);
    links.push({ short: nanoid(6), full: req.body.full, clicks: 0 })
    res.sendStatus(201)
});



export default router;
