import 'dotenv/config';
import express from 'express';
import linksRouter from './routes/links';
import Link from './models/link';
import { connect } from 'mongoose';

const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());

connect(process.env.MONGODB)
    .then(() => console.log('MongoDB connection established.'))
    .catch(error => console.error(error));

app.use('/links', linksRouter);
app.get('/:short', async (req, res) => {

    const link = await Link.findOne({ short: req.params.short });
    if(!link) return res.status(404).json({ error: 'Link not found.' });
    link.clicks++;
    link.save();

    res.redirect(link.full);
});

app.listen( PORT, () => console.log(`server started at http://localhost:${PORT}`));
