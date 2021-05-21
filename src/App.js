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
      let obj = {
          backlog: [],
          pending: [],
          qa: [],
          completed: []
      }

      this.state.list.forEach(task => {
          obj[task.status].push( 
            <div draggable className="draggable"
                key={task.name}
                onDragStart={(e) => this.handleDragStart(e, task.name)}>
                { task.name }
            </div>
          )
      })

      return(
          <div className="container">
              <Column title="To Do" name="backlog" tickets={obj.backlog} 
                handleAdd={this.handleAdd}
                handleDrop={this.handleDrop}
                handleDragOver={this.handleDragOver} />

              <Column title="In Progress" name="pending" tickets={obj.pending} 
                handleAdd={this.handleAdd}
                handleDrop={this.handleDrop}
                handleDragOver={this.handleDragOver} />


              <Column title="QA" name="qa" tickets={obj.qa} 
                handleAdd={this.handleAdd}
                handleDrop={this.handleDrop}
                handleDragOver={this.handleDragOver} />

              <Column title="Done" name="completed" tickets={obj.completed} 
                handleAdd={this.handleAdd}
                handleDrop={this.handleDrop}
                handleDragOver={this.handleDragOver} />
          </div>
      )
  }

}

