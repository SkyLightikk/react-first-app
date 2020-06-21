import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted,
                    onToggleImportant,
                    onToggleDone }) => {

  const elements = todos.map((item) => {
    const { id, hide, ...itemProps } = item;

    let className='list-group-item';
    if(hide) {
      className+= ' d-none';
    } else {
      className = 'list-group-item';
    }

    return (
      <li key={id} className={className}>
        <TodoListItem 
          {...itemProps }
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}/>
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
