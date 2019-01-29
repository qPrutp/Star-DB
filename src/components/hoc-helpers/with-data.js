import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
    return class extends Component {
        constructor() {
            super();

            this.state = {
                data: null
            };
        };

        componentDidMount() {
            this.update();
        };

        update() {
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data
                    });
                });
        }

        componentDidUpdate(prevProps) {
            if (this.props.getData !== prevProps.getData) {
                this.update();
            }
        }

        render() {
            const { data } = this.state;

            if (!data) {
                return <Spinner />;
            }

            return <View {...this.props} data={data} />;
        }
    }
}

export default withData;