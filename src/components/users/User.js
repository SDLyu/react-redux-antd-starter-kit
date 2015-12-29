import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';
import {Icon} from 'antd';

import './user.css';

export default React.createClass({

    handleClick() {

    },

    render() {
        const prop = this.props;

        return (
            <Col xs={12} sm={4} className="user">
                <Col xs={4} className="photo"><Icon type="smile" /></Col>
                <Col xs={8}>
                    <h2>{prop.display_name || prop.username}</h2>
                    <div>{prop.email}</div>
                    <div><a href="#" onClick={this.handleClick}>+ Follow</a></div>
                </Col>
            </Col>
        );
    }
});
