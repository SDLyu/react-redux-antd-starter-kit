import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';
import {Table, Button, Icon, Popconfirm, Spin, Input} from 'antd';

import {getCheckIn, deleteCheckIn, editCheckIn, cancelEditCheckIn} from '../../actions/geolocation';

import './record.css';

export default class Record extends Component {
    get columns() {
        return [
            {title: 'Date', dataIndex: 'created_at', key: 'date'},
            {title: 'Place', dataIndex: 'place', key: 'place'},
            {title: 'Comment', dataIndex: 'comment', key: 'comment', render: (text, record) => this.renderCommentAction(record)},
            {title: 'Photo', dataIndex: 'photo', key: 'photo'},
            {title: 'Operation', dataIndex: 'operation', key: 'operation', render: (text, record) => this.renderRecordAction(record)}
        ];
    }

    renderCommentAction(record) {
        const {actions, geolocation} = this.props;
        const {editingCheckInId} = geolocation;

        return (
            (editingCheckInId == record.id) ?
            <Input defaultValue={record.comment} />:
            <span>{record.comment}</span>
        );
    }

    renderRecordAction(record) {
        const {actions, geolocation} = this.props;
        const {deletingCheckInId, editingCheckInId} = geolocation;

        return (
            (deletingCheckInId == record.id) ?
            <Spin />:
            (editingCheckInId == record.id) ?
            <span>
                <a href="#" onClick={actions.cancelEditCheckIn}>Cancel</a>
                <span className="ant-divider"></span>
                <a href="#">Save</a>
            </span>:
            <span>
                <a href="#" onClick={() => actions.editCheckIn(record.id)}>Edit</a>
                <span className="ant-divider"></span>
                <Popconfirm title="Are you sure?" onConfirm={() => actions.deleteCheckIn(record.id)}>
                    <a href="#">Delete</a>
                </Popconfirm>
            </span>
        );
    }

    handleDeleteCheckIn(checkInId) {
        const {actions} = this.props;

        action.deleteCheckIn(checkInId);
    }

    componentWillMount() {
        const {user, actions} = this.props;

        actions.getCheckIn(user.id);
    }

    render() {
        const {geolocation} = this.props;
        const isGettingCheckIn = geolocation.gettingCheckIn;

        return (
            <Row>
                <Col sm={10} smOffset={1}>
                    <Table columns={this.columns} dataSource={geolocation.checkIns} size="small" loading={isGettingCheckIn} />
                </Col>
            </Row>
        );
    }
}

Record.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Record.propTypes = {
    user: PropTypes.object,
};

function mapStateToProps(state) {
    const {auth, geolocation} = state;
    if (auth) {
        return {
            user: auth.user,
            geolocation
        };
    }

    return {user: null};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getCheckIn, deleteCheckIn, editCheckIn, cancelEditCheckIn}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);
