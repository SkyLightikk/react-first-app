import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    searchText: ''
  }

  onSearch = (e) => {
    const text = e.target.value;
    this.setState(({searchText}) => {
      this.props.onSearch(text);
      return {
        searchText: text
      }
    });
  }

  render() {
    return (<input type="text"
              className="form-control search-input"
              placeholder="type to search"
              onChange={this.onSearch}
              value={this.state.searchText}
              />
  );
  }
}
