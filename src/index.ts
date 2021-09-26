import 'dotenv/config';
import express from 'express';
import linksRouter from './routes/links';
import { links } from './storage';

const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());

app.use('/links', linksRouter);
app.get('/:hash', (req, res) => {

    const link = links.find(link => link.short === req.params.hash);

    if(!link) return res.status(404).json({ error: 'Link not found.' });
    link.clicks++;
    res.redirect(link.full);
});

app.listen( PORT, () => console.log(`server started at http://localhost:${PORT}`));
