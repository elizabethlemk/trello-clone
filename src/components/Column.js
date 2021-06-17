import React, {useState} from 'react';
import Ticket from './Ticket';


const Column = props => {

    const [display, setDisplay] = useState(false);
    const [error, setError] = useState(false);
    const [text, setText] = useState("");

    let { current_ticket, deselectCurrent, handleAdd, handleCurrentTicket, handleDragStart, handleDelete, handleDrop, handleDragOver, handleEdit, name, status, title, tickets } = props;
    
    const handleTextArea = event => {
        let value = event.target.value
        if (error && value.length > 0) {
            setError(false)
        }
        setText(value)
    }

    const handleCancel = event => {
        event.preventDefault();
        setDisplay(false);
        setText("");
        if (error) {
            setError(false)
        }
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        if (text.length > 0) {
            handleAdd(name, text, status);
            handleCancel(event);
        } else {
            setError(true)
        }
    }

    return (
        <div className="column" 
            onDrop={(e) => handleDrop(e, name)}
            onDragOver={(e) => handleDragOver(e)}
            data-type={name}>
            <h2 className="column__header">{ title }</h2>

            {tickets.map((ticket, index) => <Ticket task={ticket}
                key={ticket.id}
                status={name}
                index={index}
                current_ticket={current_ticket}
                handleDragStart={handleDragStart}
                handleCurrentTicket={handleCurrentTicket}
                handleDelete={handleDelete}
                deselectCurrent={deselectCurrent}
                handleEdit={handleEdit} />)}

            <form className="column__form" style={ display ? {display: "block"} : {display: "none"}} onSubmit={handleSubmit}>
                <textarea onChange={handleTextArea} value={text} placeholder="Enter a title for this card..."></textarea>
                <div className="column__form-error" style={error ? { display: "block" } : { display: "none" }}>Please enter a title</div>
                <div className="column__form-buttons">
                    <button className="btn btn--primary" type="submit">Add Card</button>
                    <button className="btn btn--link" onClick={e => handleCancel(e)}>Cancel</button>
                </div>
            </form>

            <div className="column__footer">
                <button className="btn btn--link" onClick={() => setDisplay(true)}>+ Add a card</button>
            </div>
        </div>
    )
}


export default Column
