import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details/item-details";
import Row from '../row';
import SwapiService from '../../services/swapi-service';
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

    this.swapiService = new SwapiService();

    this.state = {
      showRandomPlanet: false,
      hasError: false
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

  render() {
    if(this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    // return (
    //   <div className="stardb-app">
    //     <Header />
    //     {planet}

    //     <div className="row md2 button-row">
    //       <button
    //         className="toggle-planet btn btn-warning btn-lg"
    //         onClick={this.toggleRandomPlanet}>
    //         Toggle Random Planet
    //       </button>
    //       <ErrorButton />
    //     </div>

    //     <PeoplePage />

    //     <div className="row mb2">
    //       <div className="col-md-6">
    //         <ItemList
    //           onItemSelected={this.onPersonSelected}
    //           getData={this.swapiService.getAllPlanets}>
    //           {(i) => (
    //             i.name
    //           )}
    //         </ItemList>
    //       </div>
    //       <div className="col-md-6">
    //         {/* <ItemDetails itemId={this.state.selectedPerson} loading={true} /> */}
    //       </div>
    //     </div>

    //     <div className="row mb2">
    //       <div className="col-md-6">
    //         <ItemList
    //           onItemSelected={this.onPersonSelected}
    //           getData={this.swapiService.getAllStarships}>
    //           {(i) => (
    //             <span>{i.name} <button>!</button></span>
    //           )}
    //         </ItemList>
    //       </div>
    //       <div className="col-md-6">
    //         {/* <ItemDetails itemId={this.state.selectedPerson} loading={true} /> */}
    //       </div>
    //     </div>

    //   </div>
    // );

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header />

            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={9} />

            <PersonList />
            <StarshipList />
            <PlanetList />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    )
  }
};
