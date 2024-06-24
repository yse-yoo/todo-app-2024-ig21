// Expressモジュールを読み込み
const express = require('express');
// Routerを利用
const router = express.Router();

router.get('/todo/get', (req, res) => {
    const todos = [
        { id: 1, title: "買い物"},
        { id: 2, title: "打合せ"},
        { id: 3, title: "銀行"},
    ]
    res.json(todos);
})


// モジュール化
module.exports = router;