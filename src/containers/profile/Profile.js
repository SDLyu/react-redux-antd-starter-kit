import React, {Component, PropTypes} from 'react';
import {Row, Col, Panel} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {connect} from 'react-redux';
import {notification, Form, Input, Button, Icon, Upload, Collapse, QueueAnim, Popconfirm} from 'antd';

import {editProfile, clearSaveSuccessMessage} from '../../actions/auth';
import {getAllDevicesIfNeeded, deleteDevice} from '../../actions/device';

import './profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {actions} = this.props;

        actions.getAllDevicesIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        const {actions, errors, isShowSaveSuccessMessage, isEditingProfile, isGettingAllDevices} = nextProps;

        if (errors) {
            errors.forEach((errorMessage) => {
                notification.error({
                    message: 'Register Fail',
                    description: errorMessage
                });
            });
        }
        if (isShowSaveSuccessMessage) {
            notification.success({
                message: 'Save Profile Success',
                description: 'Welcome'
            });
            actions.clearSaveSuccessMessage();
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const {actions} = this.props;
        const email = this.refs.email.refs.input;
        const password = this.refs.password.refs.input;
        const nickname = this.refs.nickname.refs.input;
        const avatar = this.refs.avatar.refs.input;

        actions.editProfile(email.value, password.value, nickname.value, avatar.value);
    }

    handleUploadAvatar() {
        const upload = this.refs.upload.refs.input;
        const avatar = this.refs.avatar.refs.input;

        let fileReader= new FileReader();

        fileReader.readAsDataURL(upload.files[0]);
        fileReader.onload = function(e) {
            avatar.value = e.target.result;
        };
    }

    handleDeleteDevice(token) {
        const {actions} = this.props;
        actions.deleteDevice(token);
    }

    renderDevicesInformation() {
        const Panel = Collapse.Panel;
        const {devices, isGettingAllDevices, isDeletingDevice} = this.props;

        if (isGettingAllDevices) {
            return (<Icon type="loading" />);
        }

        if (!isGettingAllDevices && _.isEmpty(devices)) {
            return (<p>No Devices</p>);
        }

        if (!isGettingAllDevices && !_.isEmpty(devices))  {
            return (
                <Collapse accordion>
                    {devices.map((device, index) =>
                        <Panel header={device.token} key={index}>
                            <p>Device Type: {device.device_type}</p>
                            <p>OS Version: {device.os_version}</p>
                            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => this.handleDeleteDevice(device.token)}>
                                <Button loading={isDeletingDevice}>Delete</Button>
                            </Popconfirm>
                        </Panel>
                     )}
                </Collapse>
            );
        }
    }

    render() {
        const FormItem = Form.Item;
        const {user, isEditingProfile} = this.props;

        return (
            <div className="container">
                <Row>
                    <Col sm={6} md={4} mdOffset={2}>
                        <Panel header="Edit Profile">
                            <Form horizontal onSubmit={(event) => this.handleSubmit(event)}>
                                <FormItem label="Account：" labelCol={{span: 7}} wrapperCol={{span: 16}} required>
                                    <Input type="text" ref="accountname" id="accountname" name="accountname" value={user.username} disabled />
                                </FormItem>
                                <FormItem label="Password：" labelCol={{span: 7}} wrapperCol={{span: 16}} required>
                                    <Input type="password" ref="password" id="password" name="password" placeholder="Password" />
                                </FormItem>
                                <FormItem label="Input Again：" labelCol={{span: 7}} wrapperCol={{span: 16}} required>
                                    <Input type="password" ref="confirmpassword" id="confirmpassword" name="confirmpassword" placeholder="Input Password Again" />
                                </FormItem>
                                <FormItem label="E-mail：" labelCol={{span: 7}} wrapperCol={{span: 16}} required>
                                    <Input type="email" ref="email" id="email" name="email" placeholder="E-mail" />
                                </FormItem>
                                <FormItem label="Nickname：" labelCol={{span: 7}} wrapperCol={{span: 16}} required>
                                    <Input type="text" ref="nickname" id="nickname" name="nickname" placeholder="Nickname" />
                                </FormItem>
                                <FormItem label="Avatar：" labelCol={{span: 7}} wrapperCol={{span: 16}} required>
                                    <Input type="file" ref="upload" id="upload" name="upload" onChange={() => this.handleUploadAvatar()}/>
                                    <Input className="hidden" type="text" ref="avatar" id="avatar" name="avatar" />
                                </FormItem>

                                <Button type="primary" htmlType="submit" size="large" loading={isEditingProfile}>
                                    Save
                                </Button>
                            </Form>
                        </Panel>
                    </Col>
                    <Col sm={6}  md={4}>
                        <Panel header="Edit Devices">
                            {this.renderDevicesInformation()}
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}

Profile.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Profile.propTypes = {

};

function mapStateToProps(state) {
    const {auth, device} = state;
    if (auth) {
        return {
            user: auth.user,
            isShowSaveSuccessMessage: auth.showSaveSuccessMessage,
            devices: device.devices,
            isEditingProfile: auth.editingProfile,
            isShowSaveSuccessMessage: auth.showSaveSuccessMessage,
            isGettingCurrentDevice: device.gettingCurrentDevice,
            isGettingAllDevices: device.gettingAllDevices,
            isDeletingDevice: device.deletingDevice,
            editProfileErrors: auth.editProfileErrors
        };
    }

    return {user: null};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({editProfile, getAllDevicesIfNeeded, deleteDevice, clearSaveSuccessMessage}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
