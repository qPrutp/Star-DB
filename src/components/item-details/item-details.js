import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator';
import ErrorButton from "../error-button";

import "./item-details.css";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
}

export { Record };

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      image: null
    };
  };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  };

  onError = (err) => {
    this.setState({
      error: true
    });
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if(!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        })
      })
      .catch(this.onError);
  };

  render() {
    const { item, error, image } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { name } = item;
    
    const errorMessage = error ? <ErrorIndicator/> : null;
    const content = !error ? (
      <React.Fragment>
        <img className="item-image"
          alt="item"
          src={image} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </React.Fragment>
    ) : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {content}
      </div>
    )
  }
}
