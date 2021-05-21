import React from 'react';
import Column from './components/Column';
import Ticket from './components/Ticket';
import './App.css';

export default class App extends React.Component {
  state = {
    list: [
      {
        id: 0,
        name: "Homepage",
        status: "backlog"
      },
      {
        id: 1,
        name: "PDP",
        status: "backlog"
      },
      {
        id: 2,
        name: "Contact Us Page",
        status: "backlog"
      },
    ],
    current_ticket: null
  }

  handleDragStart = (e, name) => {
      e.dataTransfer.setData("id", name)
  }

  handleDragOver = e => {
      e.preventDefault();
  }

  handleDrop = (e, status) => {
    let id = e.dataTransfer.getData("id")

    let list = this.state.list.filter( task => {
        if (task.name === id){
            task.status = status;
        }
        return task
    })

    this.setState({ list: list })
  }

  handleAdd = (status, text) => {
    let ticket = {
        id: this.state.list[this.state.list.length - 1].id + 1,
        name: text,
        status: status
    }

      let list = [...this.state.list, ticket]

      this.setState({ list: list })
  }

  handleEdit = (id, text) => {
      if (text) {
          let list = this.state.list.map(item => {
              if (item.id === id) {
                  item.name = text
              }
              return item
          })

          this.setState({ list: list })
      }
  }

  handleDelete = (e, id) => {
      e.preventDefault();

      let list = this.state.list.filter(item => item.id !== id);
      this.setState({ list: list })

  }

  handleCurrentTicket = (id) => {
    this.setState({ current_ticket: id })
  }

  deselectCurrent = () => {
      this.setState({ current_ticket: null })
  }

  render() {
      let columns = [
          {
              title: "To Do",
              name: "backlog",
              tickets: []
          },
          {
              title: "In Progress",
              name: "pending",
              tickets: []
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
      ]

      this.state.list.forEach(task => {
          columns.forEach(item => {
              if (task.status === item.name){
                item.tickets.push(
                    <Ticket task={task} 
                        key={task.id}
                        current_ticket={this.state.current_ticket} 
                        handleDragStart={this.handleDragStart}
                        handleCurrentTicket={this.handleCurrentTicket}
                        handleDelete={this.handleDelete}
                        deselectCurrent={this.deselectCurrent}
                        handleEdit={this.handleEdit} />
                )
              }
          })
      })

      return(
          <div className="container">
              {
                  columns.map((item, index) => <Column title={item.title} name={item.name} tickets={item.tickets} key={index}
                      handleAdd={this.handleAdd}
                      handleDrop={this.handleDrop}
                      handleDragOver={this.handleDragOver} />)
              }
          </div>
      )
  }

}

