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


// モジュール化
module.exports = router;