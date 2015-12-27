import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';
import {login} from '../../actions/auth';

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            // logged in, let's show home
            this.context.history.replaceState(null, '/');
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const username = this.refs.username;
        const password = this.refs.password;
        this.props.dispatch(login(username.value, password.value));
        username.value = '';
        password.value = '';
    }

    render() {
        const {user, loginError} = this.props;
        return (
            <div className="container">
                <Row>
                    <Col sm={8} smOffset={2} md={4} mdOffset={4}>
                        <Panel header="Please Log in" footer="Or Register">
                            <form className="form-signin">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user"/></span>
                                    <input type="text" ref="username" className="form-control" placeholder="Username" required autoFocus/>
                                </div>

                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"/></span>
                                    <input type="password" ref="password" className="form-control" placeholder="Password" required/>
                                </div>

                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"/> Remember me
                                    </label>
                                </div>
                                {
                                    !user && loginError &&
                                    <div className="alert alert-danger">
                                        {loginError.message}. Hint: use admin/password to log in.
                                    </div>
                                }
                                    <button className="btn btn-primary btn-block" onClick={this.handleLogin}><i className="fa fa-sign-in"/>{' '}Log in</button>
                            </form>
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
    user: PropTypes.string,
    loginError: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {auth} = state;
    if (auth) {
        return {user: auth.user, loginError: auth.loginError};
    }

    return {user: null};
}

export default connect(mapStateToProps)(Login);


