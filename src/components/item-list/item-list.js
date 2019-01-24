import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      itemleList: null
    };
  };

  componentDidMount() {
    const { getData } = this.props;

    getData()
      .then((itemleList) => {
        this.setState({
          itemleList
        });
      });
  };

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.children(item);

      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {label}
        </li>
      );
    });
  };
  render() {
    const { itemleList } = this.state;

    if (!itemleList) {
      return <Spinner />
    }

    const items = this.renderItems(itemleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
