import React, { useState } from 'react';



const Ticket = props => {
    let { current_ticket, deselectCurrent, task, handleCurrentTicket, handleDragStart, handleEdit, handleDelete, index, status} = props;

    const [display, setDisplay] = useState(false);
    const [value, setValue] = useState(task.value);

    const handleChange = event => {
        setValue(event.target.value)
    }

    const handleSubmit = (event, id) => {
        event.preventDefault();
        handleEdit(id, value, status)
        setDisplay(false)
        deselectCurrent()
    }

    return (
        <div draggable className="draggable"
            onClick={() => handleCurrentTicket(task.id)}
            onDragStart={(e) => handleDragStart(e, task.name, index)}>
            
            { display ? (<form className="draggable__form" onSubmit={(e) => handleSubmit(e, task.id, status)}>
                    <textarea onChange={handleChange} value={value} placeholder={task.name} ></textarea>
                    <button className="btn btn--primary" type="submit">Submit</button>
                </form>) : task.name
            }

            <div className="draggable__buttons" style={current_ticket === task.id && !display ? { display: "flex" } : { display: "none" }}>
                <button className="btn btn--primary" onClick={() => setDisplay(true)}>Edit</button>
                <button className="btn btn--link" onClick={e => handleDelete(e, task.id, status)}>Delete</button>
            </div>
        </div>
    )
}

export default Ticket