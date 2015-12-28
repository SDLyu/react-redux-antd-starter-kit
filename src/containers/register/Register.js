import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';
import {notification, Form, Input, Button, Icon} from 'antd';

import {register} from '../../actions/auth';

import './register.css';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let errors = nextProps.registerErrors;
        const isRegistering = nextProps.registering;
        const {user} = nextProps;

        if (errors) {
            errors.forEach((errorMessage) => {
                notification.error({
                    message: 'Register Fail',
                    description: errorMessage
                });
            });
        }

        if (!isRegistering && !errors)  {
            notification.success({
                message: 'Register Success',
                description: 'Welcome ' + user.username
            });
        }

        if (nextProps.user) {
            this.context.history.replaceState(null, '/');
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const {actions, device} = this.props;
        const accountname = this.refs.accountname.refs.input;
        const email = this.refs.email.refs.input;
        const password = this.refs.password.refs.input;

        actions.register(accountname.value, email.value, password.value);

        accountname.value = '';
        password.value = '';
        email.value = '';
    }

    render() {
        const FormItem = Form.Item;
        const {user, registering, registerErrors} = this.props;

        return (
            <div className="container">
                <Row>
                    <Col sm={8} smOffset={2} md={4} mdOffset={4}>
                        <Panel header="Please Register">
                            <Form horizontal onSubmit={(event) => this.handleSubmit(event)}>
                                <FormItem label="Account：" labelCol={{span: 6}} wrapperCol={{span: 16}} required>
                                    <Input type="text" ref="accountname" id="accountname" name="accountname" placeholder="Account Name" />
                                </FormItem>
                                <FormItem label="Password：" labelCol={{span: 6}} wrapperCol={{span: 16}} required>
                                    <Input type="password" ref="password" id="password" name="password" placeholder="Password" />
                                </FormItem>
                                <FormItem label="E-mail：" labelCol={{span: 6}} wrapperCol={{span: 16}} required>
                                    <Input type="email" ref="email" id="email" name="email" placeholder="E-mail" />
                                </FormItem>
                                <Button type="primary" htmlType="submit" size="large" loading={registering}>
                                    Register
                                </Button>
                            </Form>
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}

Register.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Register.propTypes = {
    user: PropTypes.object,
    registerErrors: PropTypes.array,
};

function mapStateToProps(state) {
    const {auth, device} = state;
    if (auth) {
        return {
            user: auth.user,
            device: device,
            registering: auth.registering,
            registerErrors: auth.registerErrors
        };
    }

    return {user: null};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({register}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);


