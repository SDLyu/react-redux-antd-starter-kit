import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Row} from 'react-bootstrap';
import {Spin} from 'antd';

import User from './User';

export default React.createClass({
    propTypes: {

    },

    getDefaultProps() {
        return {
            users: null
        };
    },

    componentDidMount() {
        const {actions} = this.props;
        actions.fetchAllUsers();
    },

    render() {
        const {data, actions} = this.props;
        const {users, followedUsers, followingUserId} = data;

        return (
            <Row className="users">
                {
                    _.isEmpty(users) ?
                    <Spin />:
                    _.map(users, (user) => {
                        const isLoading = (followingUserId == user.id);
                        const followed = _.find(followedUsers, (followedUser) => {return followedUser.id == user.id});
                        return <User user={user} follow={actions.followUser} unfollow={actions.unfollowUser} loading={isLoading} followed={followed} />;
                    })
                }
            </Row>
        );
    }
});
