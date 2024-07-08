import React, { useEffect, useState } from 'react'
import axios from 'axios'

const defaultTodo = {
    id: 0,
    title: '',
    completed: false,
    order: 0,
}


const API_URL = process.env.REACT_APP_API_URL;

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(defaultTodo);

    console.log(API_URL);

    //初回マウント時に実行
    useEffect(() => {
        fetchTodos();
    }, [])

    // APIサーバからデータ取得
    const fetchTodos = async () => {
        const token = localStorage.getItem('token');
        const uri = API_URL + '/api/todo/get';
        try {
            const res = await axios.get(uri, {
                headers: {
                    Authorization: token,
                },
            });
            setTodos(res.data);
        } catch (error) {

        }
    }

    // changeハンドラー
    const changeNewTodo = (e) => {
        // console.log(e.target.value)
        var data = { title: e.target.value };
        setNewTodo(data);
    }

    // clickハンドラー(Addボタンをクリックしたら動く)
    const addTodo = async () => {
        // 入力チェック
        if (newTodo.title.trim() === "") return;
        const uri = API_URL + '/api/todo/add';
        try {
            // APIサーバにリクエスト
            const res = await axios.post(uri, newTodo);
            // todos に値を追加
            setTodos([res.data, ...todos]);
        } catch (error) {

        }

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