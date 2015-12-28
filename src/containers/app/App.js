import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix , Row, Col} from 'antd';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import {fetchProfile, logout} from '../../actions/auth';
import {getCurrentDevice, clearDeviceInformation} from '../../actions/device';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.fetchProfile();
        actions.getCurrentDevice();
    }

    render() {
        const {user, actions} = this.props;

        return (
            <div>
                <Header user={user} actions={actions}/>
                <div className="appContent">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired,
};

App.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const {auth} = state;
    return {
        user: auth ? auth.user : null,
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({fetchProfile, getCurrentDevice, clearDeviceInformation, logout}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
