import React, { Component } from 'react';

import Header from '../header';
import Row from '../row';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from "../error-indicator";
import SwapiService from '../../services/swapi-service';
import DummySwapiService from "../../services/dummy-swapi-service.js";
import { SwapiServiceProvider } from '../swapi-service-context';
import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';
import ErrorBoundry from '../error-boundry';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      showRandomPlanet: false,
      hasError: false,
      swapiService: new SwapiService()
    };
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return { showRandomPlanet: !state.showRandomPlanet };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onServiceChange = () => {
    this.setState((state) => {
      const { swapiService } = state;
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      }
    })
  }

  render() {
    if(this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
            {planet}

            <div className="row md2 button-row">
              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>
              <ErrorButton />
            </div>

            <Row 
              left={<PersonList />}
              right={<PersonDetails itemId={11} />}
            />
            <Row
              left={<PlanetList />}
              right={<PlanetDetails itemId={5} />}
            />
            <Row
              left={<StarshipList />}
              right={<StarshipDetails itemId={9} />}
            />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    )
  }
};
