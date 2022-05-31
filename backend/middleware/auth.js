import 'dotenv/config'
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
        if(err) {
            return res.sendStatus(403);
        }

        req.user = data;
        next();
    })
}

export default auth;