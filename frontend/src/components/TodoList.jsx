import React, { useEffect, useState } from 'react'
import axios from 'axios'

const defaultTodo = {
    id: 0,
    title: '',
    completed: false,
    order: 0,
}

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(defaultTodo);

    //初回マウント時に実行
    useEffect(() => {
        fetchTodos();
    }, [])

    // APIサーバからデータ取得
    const fetchTodos = async () => {
        //TODO: バックエンド(API)からTODOリストを取得
        // http://localhost:3001/api/todo/get
        const uri = 'http://localhost:3001/api/todo/get';
        try {
            const res = await axios.get(uri);
            setTodos(res.data);
        } catch (error) {
            
        }
        // test data
        // const data = [
        //     { id:1, title:"買い物", completed: false },
        //     { id:2, title:"打合せ", completed: true },
        //     { id:3, title:"スポーツジムに行く", completed: false },
        // ]
    }

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
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span>
                            {todo.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList