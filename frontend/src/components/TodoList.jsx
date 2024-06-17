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

    return (
        <div>
            <h2>TodoList</h2>
            <input type="text" />
            <button>Add</button>
        </div>
    )
}

export default TodoList