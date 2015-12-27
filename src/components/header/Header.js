import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import './header.css';

export default class Header extends Component {
    onLogoutClick(event) {
        event.preventDefault();
        this.props.handleLogout();
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

        const activeColor = {color: '#61dafb'};

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
                                Check in!
                            </IndexLink>
                        </div>

                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className={isExplorePage ? 'active' : ''}><Link to="/explore">Explore</Link></li>
                                <li className={isRecordPage ? 'active' : ''}><Link to="/record">Record</Link></li>
                                <li className={isFollowingPage ? 'active' : ''}><Link to="/following">Following</Link></li>
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                {user && <li className={isProfilePage ? "active" : ""}><Link to="/profile">Profile</Link></li>}
                                {user && <li className="navbar-text"><i className="fa fa-user"/>{user}</li>}
                                {user && <li><Link to="#" onClick={handleLogout}>Logout</Link></li>}
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

Header.propTypes = {
    user: PropTypes.string,
    handleLogout: PropTypes.func.isRequired
};

Header.contextTypes = {
    location: React.PropTypes.object
};
