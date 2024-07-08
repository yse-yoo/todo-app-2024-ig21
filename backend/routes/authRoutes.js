const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || 'your-secret-key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log("token:", token)
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            return res.status(403).json({ message: 'Token verification failed' });
        }
    }
};

// ユーザー登録
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
});

// ユーザーログイン
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).send('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid password');
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '24h' });
    const decoded = jwt.verify(token, secret);
    console.log(decoded)
    res.json({ token });
});

// 認証されたルート
router.get('/auth_user', authenticateToken, (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const user = jwt.verify(token, secret);
        res.json({ message: 'This is a protected route', user: user });
    } catch (error) {
        res.status(400).send('Invalid token');
    }
});

module.exports = router;
