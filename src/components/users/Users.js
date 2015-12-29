import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Row} from 'react-bootstrap';

import User from './User';

export default React.createClass({
    propTypes: {

    },

    getDefaultProps() {
        return {
            users: null
        };
    },

    componentDidMount() {
        const {actions} = this.props;
        actions.fetchAllUsers();
    },

    render() {
        const {data} = this.props;

        return (
            <Row className="users">
                {
                    _.map(data, (user) => {return <User {...user}/>;})
                }
            </Row>
        );
    }
});
