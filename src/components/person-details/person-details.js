import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';

import './person-details.css';

export default class PersonDetails extends Component {
  constructor(props) {
    super(props);

    this.swapiService = new SwapiService();

    this.state = {
      person: null
    };
  };

  componentDidMount() {
    this.updatePerson();
  };

  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  };

  onPersonLoaded = (person) => {
    this.setState({
      person,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true
    });
  };

  updatePerson() {
    const { personId } = this.props;
    if(!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  };

  render() {
    if(!this.state.person) {
      return <span>Select a person from a list</span>
    }

    const {person, error } = this.state;
    
    const errorMessage = error ? <ErrorIndicator/> : null;
    const content = !error ? <PersonView person={person}/> : null;

    return (
      <div className="person-details card">
        {errorMessage}
        {content}
      </div>
    )
  }
}

const PersonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;

  return(
    <React.Fragment>
      <img className="person-image"
        alt="person"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
