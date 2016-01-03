import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Panel, Image} from 'react-bootstrap';
import {Table, Button, Icon, Popconfirm, Spin, Input} from 'antd';

import {getCheckIn, deleteCheckIn, editCheckIn, cancelEditCheckIn, updateCheckIn} from '../../actions/geolocation';

import 'antd/lib/index.css';
import './record.css';

export default class Record extends Component {
    get columns() {
        return [
            {title: 'Date', dataIndex: 'created_at', key: 'date'},
            {title: 'Place', dataIndex: 'place', key: 'place'},
            {title: 'Comment', dataIndex: 'comment', key: 'comment', render: (text, record) => this.renderCommentAction(record)},
            {title: 'Photo', dataIndex: 'photo', key: 'photo', render: (text, record) => this.renderPhoto(record)},
            {title: 'Operation', dataIndex: 'operation', key: 'operation', render: (text, record) => this.renderRecordAction(record)}
        ];
    }

    renderCommentAction(record) {
        const {actions, geolocation} = this.props;
        const {editingCheckInId} = geolocation;

        return (
            (editingCheckInId == record.id) ?
            <div>
                <Input defaultValue={record.comment} onChange={(e) => this.handleCommentChange(e)} />
            </div>:
            <span>{record.comment}</span>
        );
    }

    renderPhoto(record) {
        const {actions, geolocation} = this.props;
        const {editingCheckInId} = geolocation;

        return (
            (editingCheckInId == record.id) ?
            <Input type="file" ref="upload" id="upload" name="upload" onChange={(event) => this.handleUploadPhoto(event)}/>:
            (record.photo) ?
            <Image className="photo" src={record.photo} thumbnail />:
            <p>No Photo</p>
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
                <a href="#" onClick={() => this.handleUpdateCheckIn(record)}>Save</a>
            </span>:
            <span>
                <a href="#" onClick={() => actions.editCheckIn(record.id)}>Edit</a>
                <span className="ant-divider"></span>
                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => actions.deleteCheckIn(record.id)}>
                    <a href="#">Delete</a>
                </Popconfirm>
            </span>
        );
    }

    handleUpdateCheckIn(record) {
        const {actions} = this.props;
        const comment = this.refs.comment.refs.input;
        const photo = this.refs.photo.refs.input;

        actions.updateCheckIn(record.id, record.place_id, comment.value, photo.value);

        comment.value = '';
        photo.value = ''
    }

    handleDeleteCheckIn(checkInId) {
        const {actions} = this.props;

        action.deleteCheckIn(checkInId);
    }

    handleCommentChange(e) {
        const comment = this.refs.comment.refs.input;
        comment.value = e.target.value;
    }

    handleUploadPhoto(event) {
        const photo = this.refs.photo.refs.input;

        let fileReader = new FileReader();

        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = function(e) {
            photo.value = e.target.result;
        };
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
                    <Table columns={this.columns} dataSource={geolocation.checkIns} size="small" loading={isGettingCheckIn} locale={{emptyText: 'No Data'}} />
                    <Input className="hidden" type="text" ref="comment" id="comment" name="comment" />
                    <Input className="hidden" type="text" ref="photo" id="photo" name="photo" />
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
    return {actions: bindActionCreators({getCheckIn, deleteCheckIn, editCheckIn, cancelEditCheckIn, updateCheckIn}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);
