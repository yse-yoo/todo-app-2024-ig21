import React, { useState } from 'react'

const defaultTodo = {
    id: 0,
    title: '',
    completed: false,
    order: 0,
}

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(defaultTodo);

    // changeハンドラー
    const changeNewTodo = (e) => {
        // console.log(e.target.value)
        var data = { title: e.target.value };
        setNewTodo(data);
    }

    // clickハンドラー(Addボタンをクリックしたら動く)
    const addTodo = async () => {
        // TODO: APIサーバ更新処理
        // 入力チェック
        if (newTodo.title.trim() === "") return;
        // todos に値を追加
        setTodos([...todos, newTodo]);
        // newTodo を初期化
        setNewTodo(defaultTodo)
    }

    return (
        <div>
            <h2>TodoList</h2>
            <input
                type="text"
                value={newTodo.title}
                onChange={changeNewTodo}
            />
            <button onClick={addTodo}>Add</button>
        </div>
    )
}

export default TodoList