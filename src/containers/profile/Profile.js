import React, {Component, PropTypes} from 'react';
import {Row, Col, Panel} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {notification, Form, Input, Button, Icon, Upload} from 'antd';

import {editProfile} from '../../actions/auth';

import './profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let errors = nextProps.editProfileErrors;
        let isEditing = nextProps.editingProfile;

        if (errors) {
            errors.forEach((errorMessage) => {
                notification.error({
                    message: 'Register Fail',
                    description: errorMessage
                });
            });
        }
        if (!isEditing && !errors){
            notification.success({
                message: 'Save Profile Success',
                description: 'Welcome'
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const {actions} = this.props;
        const email = this.refs.email.refs.input;
        const password = this.refs.password.refs.input;
        const nickname = this.refs.nickname.refs.input;

        actions.editProfile(email.value, password.value, nickname.value);
    }

    render() {
        const FormItem = Form.Item;
        const {user, editingProfile} = this.props;

        return (
            <div className="container">
                <Row>
                    <Col sm={8} smOffset={2} md={4} mdOffset={4}>
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
                                    <Upload listType="picture">
                                        <Button type="ghost">
                                            <Icon type="upload" /> Upload Avatar
                                        </Button>
                                    </Upload>
                                </FormItem>

                                <Button type="primary" htmlType="submit" size="large" loading={editingProfile}>
                                    Save
                                </Button>
                            </Form>
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
    const {auth} = state;
    if (auth) {
        return {user: auth.user, editingProfile: auth.editingProfile, editProfileErrors: auth.editProfileErrors};
    }

    return {user: null};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({editProfile}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
