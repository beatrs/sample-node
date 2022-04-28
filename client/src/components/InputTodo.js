import React, { Fragment } from "react";

export default function InputTodo() {

    const [description, setDescription] = React.useState("n/a")

    function updateDesc(desc) {
        setDescription(desc)
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            const body = { description }
            const response = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            if (response)
                window.location = "/" // refresh page on success of submit form
        } catch (err) {
            console.error(err.message)
            
        }
    }

    return(
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mx-auto mt-5 input-form" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className="form-control"
                    value={description}
                    onChange={(e) => updateDesc(e.target.value)}
                />
                <button 
                    className="btn btn-success"
                >
                    Add
                </button>
            </form>
        </Fragment>
    )
}