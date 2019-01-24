import React, { Component } from 'react';

import SwapiService from "../../services/swapi-service";
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {
    constructor() {
        super();

        this.swapiService = new SwapiService();

        this.state = {
            selectedPerson: 3
        };
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>
                {(i) => (
                    `${i.name} (${i.birthYear})`
                )}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <PersonDetails
                    personId={this.state.selectedPerson}
                    loading={true} />
            </ErrorBoundry >
        );

        return (
            <Row left={itemList} right={personDetails} />
        )
    }
}