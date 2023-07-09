import { auth } from '../firebase/auth.js';

const getAuthToken = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        req.token = req.headers.authorization.split(' ')[1];
    } else {
        req.token = null;
    }
    next();
};

const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const user = await auth.verifyIdToken(req.token);
            req.user = user.uid;
            next();
        } catch (err) {
            return res.status(401).send("You are not authenticated");
        }
    });
};

export { getAuthToken, checkIfAuthenticated };