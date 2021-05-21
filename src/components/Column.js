import React, {useState} from 'react';



const Column = props => {

    const [display, setDisplay] = useState(false);
    const [error, setError] = useState(false);
    const [text, setText] = useState("");

    let {name, handleAdd, handleDrop, handleDragOver, title, tickets} = props;
    
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
            handleAdd(name, text);
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
            
            {tickets}

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
