import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import {Steps, Carousel, Tabs, Spin} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getGeoLocation} from '../../actions/geolocation';
import {fetchAllUsers, followUser, unfollowUser} from '../../actions/user';
import Googlemap from '../../components/googlemap/Googlemap';
import Users from '../../components/users/Users';

import 'antd/lib/index.css';
import './explore.css';

export default class Explore extends Component {
    render() {
        const TabPane = Tabs.TabPane;
        const {actions, geolocation, user} = this.props;

        return (
            <Row>
                <Col sm={8} smOffset={2}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Places" key="1">
                            <Googlemap actions={actions} lat={geolocation.lat} lon={geolocation.lon}/>
                        </TabPane>
                        <TabPane tab="Checkins" key="2">
                        </TabPane>
                        <TabPane tab="Users" key="3">
                            <Users actions={actions} data={user} />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

Explore.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Explore.propTypes = {
    user: PropTypes.object,
    registerErrors: PropTypes.array,
};

function mapStateToProps(state) {
    const {geolocation, user} = state;

    return {geolocation, user};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getGeoLocation, fetchAllUsers, followUser, unfollowUser}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

