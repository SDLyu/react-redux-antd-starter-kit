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
        const isRecordPage = pathname.indexOf('record') > -1;
        const isExplorePage = pathname.indexOf('explore') > -1;
        const isFollowingPage = pathname.indexOf('following') > -1;

        const activeColor = {color: '#61dafb'};

        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
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
                                <li className={isRecordPage ? 'active' : ''}><Link to="/record">Record</Link></li>
                                <li className={isExplorePage ? 'active' : ''}><Link to="/explore">Explore</Link></li>
                                <li className={isFollowingPage ? 'active' : ''}><Link to="/following">Following</Link></li>
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span className="fa fa-user header_fa"></span>{user ? user : 'Anonymous'}<span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="logout-link">
                                            <a href="#" onClick={ event=>this.onLogoutClick(event)}><i className="fa fa-sign-out header_fa"/>Log out</a>
                                        </li>
                                    </ul>
                                </li>
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
