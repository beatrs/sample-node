import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap'

export default function EditTodo({ todo }) {
    
    const [description, setDescription] = React.useState(todo.description)
    const [show, setShow] = React.useState(false);

    const handleSubmit = async() => {
        try {
            const body = { description }
            const response = await fetch(`/todos/${todo.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            handleClose()

            if (response)
                window.location = "/" // refresh page on success of submit form
        } catch (err) {
            console.error(err.message)
        }

    }
    const handleClose = () => {
        setShow(false)
        setDescription(todo.description)
    };
    const handleShow = () => setShow(true);

    function updateDesc(desc) {
        setDescription(desc)
    }
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                
                    <input 
                        type="text" 
                        className='form-control modal-form'
                        onChange={(e) => updateDesc(e.target.value)}
                        value={description}
                    />

                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}