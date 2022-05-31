import 'dotenv/config'
import user from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const {email, password} = req.body;

    user.findOne({email})
        .then(doc => {
            if(!doc) {
                return res.sendStatus(404);
            }
            
            const {displayName} = doc;

            const passwordIsValid = bcrypt.compareSync(password, doc.password);
            if(!passwordIsValid) return res.sendStatus(403);

            const token = jwt.sign({displayName, email}, process.env.ACCESS_TOKEN, {expiresIn: '15s'});
            const refreshToken = jwt.sign({displayName, email}, process.env.REFRESH_TOKEN);

            res.cookie('token', token, {maxAge: 900000, httpOnly: true});
            res.cookie('refreshToken', refreshToken, {httpOnly: true});

            res.json({email, displayName});
        })
}

const register = async (req, res) => {
    const {email, displayName} = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);

    const newUser = new user({
        email, 
        displayName, 
        password
    });

    newUser.save()
        .then(doc => {
            if(!doc) {
                return res.sendStatus(404);
            }

            return res.sendStatus(201);
        })
        .catch(err => res.sendStatus(404));
}

const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;

    jwt.verify(token, process.env.REFRESH_TOKEN, (err, data) => {
        if(err) {
            return res.sendStatus(403);
        }

        const payload = {
            displayName: data.displayName,
            email: data.email
        }

        const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '30s'});
        res.cookie('token', newAccessToken, {maxAge: 900000, httpOnly: true});
        res.sendStatus(200);
    })
}

export {
    login,
    register,
    refreshToken
}