import React from 'react';
import './item-add-form.css';

const ItemAddForm = ({onAdded}) => {
  return (
    <div className="item-add-form">
      <button type="button" className="btn btn-outline-secondary"
        onClick={() => onAdded('Sleep')}>      
        Добавить
      </button>
    </div>
  );
}

export default ItemAddForm;