import React, { Fragment } from "react";
import EditTodo from "./EditTodo";

export default function ListTodo() {

    const [todos, setTodos] = React.useState([])

    const deleteTodo = async(id) => {
        try {
            const response = await fetch(`/todos/${id}`, {
                method: "DELETE"
            })
            
            setTodos(todos.filter(todo => todo.id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }
    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos") // method: GET by default
            const jsonRes = await response.json()

            console.log(jsonRes)
            setTodos(jsonRes)
        } catch (err) {
            console.error(err.message);
        }
    }

    React.useEffect(() => {
        getTodos()
    }, [])

    const todoItems = todos.map(item => {
        return (
            <tr key={item.id}>
                <td>{item.description}</td>
                <td>
                    <EditTodo key={item.id} todo={item} />
                </td>
                <td>
                    <button 
                        className="btn btn-danger"
                        onClick={() => deleteTodo(item.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    })

    return(
        <div>
            {" "}
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todoItems}
                </tbody>
            </table>
        </div>
    )
}