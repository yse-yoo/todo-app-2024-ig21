const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const secret = "todo-app";

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
router.get('/auth_user', (req, res) => {
    const token = req.headers['authorization'];
    console.log(token)
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const decoded = jwt.verify(token, secret);
        res.json({ message: 'This is a protected route', user: decoded });
    } catch (error) {
        res.status(400).send('Invalid token');
    }
});

module.exports = router;
