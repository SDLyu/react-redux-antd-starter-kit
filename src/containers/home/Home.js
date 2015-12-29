import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Form, Input, Button, Steps, QueueAnim, Upload, Icon} from 'antd';

import {getGeoLocation, checkIn, createPlace} from '../../actions/geolocation';
import Googlemap from '../../components/googlemap/Googlemap';
import './home.css';

export default class Home extends Component {

    handleCheckIn() {
        const {actions, geolocation} = this.props;
        const {placeId} = geolocation;
        const comment = this.refs.comment.refs.input;

        actions.checkIn(placeId, comment.value);
    }

    handleCreatePlace() {
        const {actions, geolocation} = this.props;
        const {lat, lon} = geolocation;
        const name = this.refs.name.refs.input;

        actions.createPlace(name.value, lat, lon);
    }

    render() {
        const FormItem = Form.Item;
        const Step = Steps.Step;
        const {user, actions, geolocation} = this.props;
        const {lat, lon, placeId, checkInId} = geolocation;
        const isCreattingPlace = geolocation.creatingPlace;
        const isCheckingIn = geolocation.checkingIn;
        const hasPlaceId = _.isNumber(placeId);
        const hasCheckInId = _.isNumber(checkInId);

        let step = hasPlaceId ? (hasCheckInId ? 3 : 1) : 0;

        return (
            <Row>
                <Col id="step-container" sm={8} smOffset={2}>
                    <div id="steps">
                        <Steps current={step}>
                            <Step key="create" title="Create Place"/>
                            <Step key="checkin" title="Check In"/>
                            <Step key="success" title="Success"/>
                        </Steps>
                    </div>
                    <div>
                        <QueueAnim delay={500} key="name">
                            {
                                !hasPlaceId ? [
                                    <Form inline key="name">
                                        <FormItem id="name">
                                            <Input id="name" name="name" ref="name" placeholder="Place Name"/>
                                        </FormItem>
                                        {!user && <Link to="/login"><Button type="primary">Add Place</Button></Link>}
                                        {user && <Button type="primary" onClick={() => this.handleCreatePlace()} loading={isCreattingPlace}>Add Place</Button>}
                                    </Form>
                                ] : null
                            }
                        </QueueAnim>
                        <QueueAnim delay={500} key="comment">
                            {
                                hasPlaceId && !hasCheckInId ? [
                                    <Form inline key="comment">
                                        <FormItem>
                                            <Input id="comment" name="comment" ref="comment" placeholder="Some Comment"/>
                                        </FormItem>
                                        <Upload>
                                            <Button type="ghost">
                                                <Icon type="upload" /> Upload
                                            </Button>
                                        </Upload>
                                        <Button type="primary" onClick={() => this.handleCheckIn()} loading={isCheckingIn}>Check In</Button>
                                    </Form>
                                ] : null
                            }
                        </QueueAnim>
                        <QueueAnim delay={500} key="success">
                            {
                                hasCheckInId ? [<h3 key="success"><Icon type="environment" /> Congrets! Check In Success</h3>] : null
                            }
                        </QueueAnim>
                    </div>
                </Col>
                <Col sm={8} smOffset={2}>
                    <Googlemap actions={actions} lat={lat} lon={lon}/>
                </Col>
            </Row>
        );
    }
}

Home.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Home.propTypes = {
    user: PropTypes.object,
};

function mapStateToProps(state) {
    const {auth, geolocation} = state;
    if (auth) {
        return {
            user: auth.user,
            geolocation: geolocation
        };
    }

    return {user: null, geolocation: geolocation};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getGeoLocation, checkIn, createPlace}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


