import React, { useState, useRef } from 'react';
import Column from './components/Column';

import './App.css';

const App = () => {
    // State 
    const [columns, setColumns] = useState([
        {
            title: "To Do",
            name: "backlog",
            tickets: [
            
                {
                    id: 1,
                    name: "PDP",
                    status: "backlog"
                },
                {
                    id: 2,
                    name: "Contact Us Page",
                    status: "backlog"
                }
            ]
        },
        {
            title: "In Progress",
            name: "pending",
            tickets: [{
                id: 0,
                name: "Homepage",
                status: "pending"
            },]
        },
        {
            title: "QA",
            name: "qa",
            tickets: []
        },
        {
            title: "Done",
            name: "completed",
            tickets: []
        }
    ])

    const [current_ticket, setCurrentTicket] = useState(null)
    const draggingItem = useRef();
    const dragOverItem = useRef();

    // Functions

    // Currently the drag and drop doesnt work on mobile. When these functions are finished, it should support it.
    const handleDragStart = (e, name, index) => {
        draggingItem.current = index
        e.dataTransfer.setData("id", name)
    }

    const handleDragEnter = (e, name, index) => {
        draggingItem.current = index
    }

    const handleDragEnd = (e, status) => {
        // const list_copy = list.filter(item => item.status === status)
    }

    const handleDragOver = e => {
        e.preventDefault();
    }

    // the CRUD functions need to filter out the selected ticket, change the status of the ticket, and reinsert into the proper column object
    const handleDrop = (e, status) => {
        let id = e.dataTransfer.getData("id")
        let idx;
        let current_ticket;
        let columns_copy = columns

        let select_column = columns.find((item, index) => {
            if (item.name === status) {
                idx = index
                return item
            }
        })
        columns.forEach(item => item.tickets.find(ticket => { 
            if (ticket.name === id) {
                return ticket
            }
        }))
        
        ticket.status = status

        let new_list = columns.tickets.find(task => {
            if (task.name === id) {
                task.status = status;
            }
            return task
        })

        select_column.tickets = new_list
        columns_copy[idx] = select_column

        setColumns(columns_copy)
    }

    const handleAdd = (status, text) => {
        let id;
        let last_id = 0

        columns.forEach(item => last_id + item.tickets.length)

        if (last_id > 0) {
            id = last_id

        } else {
            id = 0
        }

        let ticket = {
            id: id,
            name: text,
            status: status
        }
        let idx;
        let columns_copy = columns
        let select_column = columns.find((item, index) => {
            if (item.status === status) {
                idx = index
                return item
            }
        })

        let new_list = select_column.tickets.map(item => {
            if (item.id === id) {
                item.name = text
            }
            return item
        })
        select_column.tickets.push(ticket)
        columns_copy[idx] = select_column

        setColumns(columns_copy)
        setCurrentTicket(null)
    }

    const handleEdit = (id, text, status) => {
        if (text) {
            let idx;
            let columns_copy = columns
            let select_column = columns.find((item, index) => {
                if (item.status === status) {
                    idx = index
                    return item
                }
            })

            let new_list = select_column.tickets.map(item => {
                if (item.id === id) {
                    item.name = text
                }
                return item
            })
            select_column.tickets = new_list
            columns_copy[idx] = select_column

            setColumns(columns_copy)

        }
    }

    const handleDelete = (e, id, status) => {
        e.preventDefault();
        let idx;

        let columns_copy = columns
        let select_column = columns.find((item, index) => {
            if (item.status === status){
                idx = index
                return item
            }
        })
        let new_list = select_column.tickets.filter(item => item.id !== id);
            select_column.tickets = new_list
            columns_copy[idx] = select_column

        setColumns(columns_copy)

    }

    const handleCurrentTicket = (id) => {
        setCurrentTicket(id)
    }

    const deselectCurrent = () => {
        setCurrentTicket(null)
    }

    return (

        <div className="container">
            {
                columns.map((item, index) => <Column title={item.title} name={item.name} tickets={item.tickets} key={index}
                    current_ticket={current_ticket}
                    handleDragStart={handleDragStart}
                    handleCurrentTicket={handleCurrentTicket}
                    handleDelete={handleDelete}
                    deselectCurrent={deselectCurrent}
                    handleEdit={handleEdit}
                    handleAdd={handleAdd}
                    handleDrop={handleDrop}
                    handleDragOver={handleDragOver} />)
            }
        </div>
    )

}

export default App
