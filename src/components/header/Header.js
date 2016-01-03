import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {Image} from 'react-bootstrap';
import {Icon} from 'antd';

import {cookies} from '../../actions/utils';
import './header.css';

export default class Header extends Component {
    handleLogout() {
        const {actions} = this.props;
        actions.logout();
        actions.clearDeviceInformation();
    }

    render() {
        const {user} = this.props;
        const pathname = this.context.location.pathname;
        const isLoginPage = pathname.indexOf('login') > -1;
        const isRegisterPage = pathname.indexOf('register') > -1;
        const isProfilePage = pathname.indexOf('profile') > -1;
        const isRecordPage = pathname.indexOf('record') > -1;
        const isExplorePage = pathname.indexOf('explore') > -1;
        const isFollowingPage = pathname.indexOf('following') > -1;

        const activeColor = {color: '#2db7f5'};

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <IndexLink to="/" className="navbar-brand" activeStyle={activeColor}>
                                <Icon type="environment" /> CheckIn!
                            </IndexLink>
                        </div>

                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                {user && <li className={isExplorePage ? 'active' : ''}><Link to="/explore">Explore</Link></li>}
                                {user && <li className={isRecordPage ? 'active' : ''}><Link to="/record">Record</Link></li>}
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                {
                                    user &&
                                    <li className={isProfilePage ? "active" : ""}>
                                        <Link to="/profile">
                                            {user.avatar ? <Image className="avatar" src={user.avatar} circle /> : <i className="fa fa-user"/>}&nbsp;{user.display_name || user.username}
                                        </Link>
                                    </li>
                                }
                                {user && <li><Link to="#" onClick={() => this.handleLogout()}>Logout</Link></li>}

                                {!user && <li className={isRegisterPage ? 'active' : ''}><Link to="/register">Register</Link></li>}
                                {!user && <li className={isLoginPage ? 'active' : ''}><Link to="/login">Login</Link></li>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Header.contextTypes = {
    location: React.PropTypes.object
};

Header.propTypes = {
    user: PropTypes.object,
};
