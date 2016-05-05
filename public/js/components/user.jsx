/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CONSTANTS = require('../constants/constants');

var SearchBar = require('./searchBar.jsx');

module.exports = React.createClass({
	displayName: 'user.jsx',
	mixins: [FluxMixin, StoreWatchMixin('UserStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		var flux = this.getFlux();

		return flux.store('UserStore').getState();
	},
    render: function() {
		console.log(0, this.state.selectedUser);
		var matchedUsers;

		if (this.state.matchedUsers) {
			matchedUsers = (<SearchBar keys="email" matches={ this.state.matchedUsers } onSelectedAction={CONSTANTS.USER.SELECTED} />)
		}

        return (
            <div className="page page_user">
                <div className="user_avatar"></div>
                <form>
                	<label>
                		Email
	                	<input type="email" placeholder="Email" onChange={ this.searchUsers } value={this.state.selectedUser} />
	                	{ matchedUsers }
	                </label>
	                <label>
	                	Name
	                	<input type="text" placeholder="Name" />
	                </label>
                </form>
            </div>
        );
    },

    searchUsers: function(e) {
    	var matchedUsers = this.state.users.filter(function(user) {
    		return (user.email.search(e.currentTarget.value) > -1) ? user : false;
    	});

		this.setState({
			matchedUsers: (matchedUsers.length > 0) ? matchedUsers : []
		});
    },

    searchUsersSelected: function(e) {
    	console.log('searchUsersSelected', e.currentTarget);
    }

});