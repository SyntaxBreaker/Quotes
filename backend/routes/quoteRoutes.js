import express from 'express';
import {addQuote, getQuote, listOfQuotes, removeQuote, editQuote} from '../controllers/quotes.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', listOfQuotes);
router.post('/add', auth, addQuote);
router.get('/quote/:id', getQuote);
router.delete('/remove/:id', auth, removeQuote);
router.patch('/edit/:id', auth, editQuote);

export default router;