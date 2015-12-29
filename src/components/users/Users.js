import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

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
        return (
            <div className="users">
            </div>
        );
    }
});
