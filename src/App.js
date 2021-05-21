import React from 'react';
import Column from './components/Column';
import './App.css';

export default class App extends React.Component {
  state = {
    list: [
      {
        name: "Homepage",
        status: "backlog"
      },
      {
        name: "PDP",
        status: "backlog"
      },
      {
        name: "Contact Us Page",
        status: "backlog"
      },
    ]
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
        name: text,
        status: status
    }

      let list = [...this.state.list, ticket]

    console.log(list)
      this.setState({ list: list })
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
                    <div draggable className="draggable"
                        key={task.name}
                        onDragStart={(e) => this.handleDragStart(e, task.name)}>
                        {task.name}
                    </div>
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

