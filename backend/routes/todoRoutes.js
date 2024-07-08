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

// http://localhost:3001/api/todo/get
router.get('/todo/get', authenticateToken, async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    // const token = req.headers['authorization'];
    console.log(token)
    try {
        const decoded = jwt.verify(token, secret);
        console.log("decoded", decoded)
        // SELECT * FROM todos;
        const todos = await prisma.todo.findMany(
            {
                orderBy: { created_at: 'desc' }
            }
        );
        res.json(todos);
    } catch (error) {
        res.json({ message: "get error" })
    }
})

router.get('/todo/fetch/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        // SELECT * FROM todos;
        const todo = await prisma.todo.findFirst(
            {
                where: { id: Number(id) }
            }
        );
        res.json({ todo });
    } catch (error) {
        res.json({ message: "add error" })
    }
})

// データ追加（POST）: 非同期通信
router.post('/todo/add', async (req, res) => {
    // リクエストされたデータを取得
    const token = req.headers['authorization'];
    console.log(token)
    const user = jwt.verify(token, secret);
    console.log("user", user)
    const data = req.body;
    try {
        // INSERT INTO todos (title) VALUES ('xxxx', false);
        const todo = await prisma.todo.create({ data: data });
        res.json(todo);
    } catch (error) {
        res.json({ message: "add error" })
    }
})

// データ更新（POST）
router.post('/todo/update/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { complted } = req.body;
    const data = req.body;
    try {
        const todo = await prisma.todo.update({
            data: { complted: complted },
            where: { id: Number(id) }
        }
        );
        res.json(todo);
    } catch (error) {
        res.json({ message: "update error" })
    }
})

// データ削除（POST）
router.post('/todo/delete/:id', async (req, res) => {
    //TODO: DB処理
    const id = parseInt(req.params.id);
    try {
        const todo = await prisma.todo.delete({
            where: { id: Number(id) }
        });
        res.json(todo);
    } catch (error) {
        res.json({ message: "delete error" })
    }
})

module.exports = router;