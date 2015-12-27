import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';
import {notification, Form, Input, Button, Icon} from 'antd';

import {login} from '../../actions/auth';

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.loginErrors;
        const isLoggingIn = nextProps.loggingIn;
        const user = nextProps.user

        if (error) {
            notification.error({
                message: 'Login Fail',
                description: error
            });
        }

        if (!isLoggingIn && !error)  {
            notification.success({
                message: 'Login Success',
                description: 'Welcome ' + user.username
            });
        }

        if (nextProps.user) {
            this.context.history.replaceState(null, '/');
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const {actions} = this.props;
        const accountname = this.refs.accountname.refs.input;
        const password = this.refs.password.refs.input;

        actions.login(accountname.value,  password.value);

        accountname.value = '';
        password.value = '';
    }

    render() {
        const FormItem = Form.Item;
        const {user, loggingIn, loginError} = this.props;

        return (
            <div className="container">
                <Row>
                    <Col sm={8} smOffset={2} md={4} mdOffset={4}>
                        <Panel header="Please Log In">
                            <Form horizontal onSubmit={(event) => this.handleSubmit(event)}>
                                <FormItem label="Account：" labelCol={{span: 6}} wrapperCol={{span: 16}} required>
                                    <Input type="text" ref="accountname" id="accountname" name="accountname" placeholder="Account Name" />
                                </FormItem>
                                <FormItem label="Password：" labelCol={{span: 6}} wrapperCol={{span: 16}} required>
                                    <Input type="password" ref="password" id="password" name="password" placeholder="Password" />
                                </FormItem>
                                <Button type="primary" htmlType="submit" size="large" loading={loggingIn}>
                                    Login
                                </Button>
                            </Form>
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}

Login.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Login.propTypes = {
    user: PropTypes.object,
    loginErrors: PropTypes.string,
};

function mapStateToProps(state) {
    const {auth} = state;
    if (auth) {
        return {user: auth.user, loggingIn: auth.loggingIn, loginErrors: auth.loginErrors};
    }

    return {user: null};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({login}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


