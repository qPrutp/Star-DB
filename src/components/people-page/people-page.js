import React, { Component } from 'react';

import SwapiService from "../../services/swapi-service";
import ItemList from '../item-list';
import ItemDetails from "../item-details";
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {
    constructor() {
        super();

        this.swapiService = new SwapiService();

        this.state = {
            selectedPerson: 11
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

        // const personDetails = (
        //     <ErrorBoundry>
        //         <ItemDetails
        //             itemId={this.state.selectedPerson}
        //             loading={true} />
        //     </ErrorBoundry >
        // );

        return (
            // <Row left={itemList} right={personDetails} />
            <Row left={itemList} right={''} />
        )
    }
}