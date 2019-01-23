import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

import './random-planet.css';

export default class RandomPlanet extends Component {
  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      planet: {},
      loading: true
    };

  };

  componentDidMount() {
    console.log('Did mount');
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    console.log('update');
    const id = Math.floor(Math.random()*25) + 3;
    // const id = 15;
      this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
  };

  render() {
    const { loading, planet, error } = this.state;

    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errorMessage}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        alt="planet"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
