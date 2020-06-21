import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    return { 
        label: label,
        important: false,
        done: false,
        id: this.maxId++,
        hide: false
    };
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id );

      const newArray = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    
    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,
        newItem
      ];
      return ({
        todoData: newArr
      });
    });
  };

  toggleProperty(arr, id ,propName) {
    const idx = arr.findIndex((el) => el.id === id );
    //update object
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    //construct new array
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }
  
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };
  
  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearch = (searchText) => {
    let newItem = {};
    let newArr = [];
    for (let i = 0; i < this.state.todoData.length; i++){
      const item = this.state.todoData[i];
      if (item.label.toLowerCase().includes(searchText.toLowerCase())) {
        newItem = {...item};
        newItem.hide = false;
        newArr.push(newItem);
      } else {
        newItem = {...item};
        newItem.hide = true;
        newArr.push(newItem);
      }
    }
    this.setState(() => {
      return {
        todoData: newArr
      }
    });

  };

  render() {
    const {todoData} = this.state;
    const doneCount = todoData
                      .filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter />
        </div>
  
        <TodoList todos={todoData}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm
          onAdded={this.addItem}/>
      </div>
    );
  }
}
