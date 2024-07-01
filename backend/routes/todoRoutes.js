// Expressモジュールを読み込み
const express = require('express');
// Routerを利用
const router = express.Router();

// PrismaClient を作成(MySQLをプログラムで操作できるようになる)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// http://localhost:3001/api/todo/get
router.get('/todo/get', (req, res) => {
    //TODO: DB処理
    // テストデータを返す
    const todos = [
        { id: 1, title: "買い物", completed: false },
        { id: 2, title: "打合せ", completed: false },
        { id: 3, title: "銀行", completed: true },
        { id: 4, title: "スポーツジムに行く", completed: true },
    ]
    res.json(todos);
})

router.get('/todo/fetch/:id', (req, res) => {
    //TODO: DB処理

    const id = parseInt(req.params.id, 10);
    // テストデータを返す
    const todos = [
        { id: 1, title: "買い物", completed: false },
        { id: 2, title: "打合せ", completed: false },
        { id: 3, title: "銀行", completed: true },
    ]
    const todo = todos.find(todo => todo.id === id);
    res.json(todo);
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
    res.json(data);
})

// データ更新（POST）
router.post('/todo/update/:id', (req, res) => {
    //TODO: DB処理
    var data = req.body;
    data = { id: 1, title: "買い物", completed: true };
    res.json(data);
})

// データ削除（POST）
router.post('/todo/delete/:id', (req, res) => {
    //TODO: DB処理
    var id = req.params.id;
    res.json({ id: id });
})

// モジュール化
module.exports = router;