// Expressモジュールを読み込み
const express = require('express');
// Routerを利用
const router = express.Router();

// PrismaClient を作成(MySQLをプログラムで操作できるようになる)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// http://localhost:3001/api/todo/get
router.get('/todo/get', async (req, res) => {
    try {
        // SELECT * FROM todos;
        const todos = await prisma.todo.findMany(
            {
                orderBy: { created_at: 'desc' }
            }
        );
        res.json(todos);
    } catch (error) {
        res.json({ message: "add error" })
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

// モジュール化
module.exports = router;