import Quote from '../models/quotes.js';

const listOfQuotes = async (req, res) => {
    Quote.find()
    .then(docs => {
        const response = {
            data: docs.map(doc => ({
                id: doc.id,
                quote: doc.quote,
                author: doc.author,
                createdBy: doc.createdBy
            }))
        }

        return res.json(response.data);
    })
    .catch(err => {
        return res.sendStatus(404);
    })
}

const getQuote = async (req, res) => {
    Quote.find({_id: req.params.id})
        .then(result => {
            if(!result) {
                return res.sendStatus(404);
            }

            return res.json(result)
        })
        .catch(err => res.sendStatus(404))
}

const addQuote = async (req, res) => {
    const {quote, author} = req.body;

    if(!quote && !author) {
        return res.sendStatus(400);
    }

    const newQuote = new Quote({
        quote,
        author,
        createdBy: req.user.email
    });

    newQuote.save()
        .then(result => {
            if(!result) {
                return res.sendStatus(404);
            }

            return res.sendStatus(201);
        })
        .catch(err => {
            return res.sendStatus(404);
        })
}

const removeQuote = async (req, res) => {
    const id = req.params.id;
    const user = req.user.email;

    Quote.findOneAndRemove({_id: id})
        .then(doc => {
            if(!doc) {
                return res.sendStatus(404);
            } else if(doc.createdBy !== user) {
                return res.sendStatus(403);
            }

            return res.sendStatus(200);
        })
        .catch(err => {
            return res.sendStatus(404);
        })
}

const editQuote = async (req, res) => {
    const id = req.params.id;
    const {quote, author} = req.body;
    const user = req.user.email;

    Quote.findByIdAndUpdate({_id: id}, {quote, author})
        .then(doc => {
            if(!doc) {
                return res.sendStatus(404);
            } else if(doc.createdBy !== user) {
                return res.sendStatus(403);
            }

            return res.sendStatus(200)
        })
        .catch(err => res.sendStatus(404))
}

export {
    addQuote,
    getQuote,
    listOfQuotes,
    removeQuote,
    editQuote
}