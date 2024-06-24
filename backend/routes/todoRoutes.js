// Expressモジュールを読み込み
const express = require('express');
// Routerを利用
const router = express.Router();

router.get('/todo/get', (req, res) => {
    //TODO: DB処理
    // テストデータを返す
    const todos = [
        { id: 1, title: "買い物", completed: false },
        { id: 2, title: "打合せ", completed: false },
        { id: 3, title: "銀行", completed: true },
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

// データ追加（POST）
router.post('/todo/add', (req, res) => {
    //TODO: DB処理
    var data = req.body;
    data = { id: 1, title: data.title, completed: false };
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