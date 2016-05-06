/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

var SearchBar = require('./searchBar.jsx');

module.exports = React.createClass({
	displayName: 'user.jsx',
	mixins: [FluxMixin, StoreWatchMixin('UserStore')],
	getInitialState: function() {
		return {
			selectedUser: {
				name: '',
				email: ''
			}
		};
	},
	getStateFromFlux: function() {
		var flux = this.getFlux();

		return flux.store('UserStore').getState();
	},
	componentDidMount: function() {
		window.scrollTo(0,0);

		this.getFlux().actions.products.reset();
	},
    render: function() {
		console.log(0, this.state.selectedUser);
		var matchedUsers;

		if (this.state.matchedUsers) {
			matchedUsers = (<SearchBar keys="email" matches={ this.state.matchedUsers } onSelectedAction={this.searchUsersSelected} />)
		}

		var avatarClasses = {
			user_avatar: true
		};
		var avatarInlineCSS = {};

		if (this.state.selectedUser && this.state.selectedUser.avatar) {
			avatarClasses.user_selected 	= true;
			avatarInlineCSS.backgroundImage = 'url(images/avatars/' + this.state.selectedUser.avatar + '.jpg)';
		}

        return (
            <div className="page page_user">
                <div className={cx(avatarClasses)} style={avatarInlineCSS}></div>
                <p className="center">Add your client</p>

                <form>
                	<label>
                		Email
	                	<input type="email" placeholder="Email" onChange={ this.updateEmail } value={ this.state.selectedUser.email } />
	                	{ matchedUsers }
	                </label>
	                <label>
	                	Name
	                	<input type="text" placeholder="Name" onChange={ this.updateName } value={ this.state.selectedUser.name } />
	                </label>
	                <button type="submit" onClick={this.proceed} disabled={ (!this.state.selectedUser.email) }>Proceed</button>
                </form>
            </div>
        );
    },
    updateEmail: function(e) {
    	var matchedUsers = this.state.users.filter(function(user) {
    		return (user.email.search(e.currentTarget.value) > -1) ? user : false;
    	});

		this.setState({
			selectedUser: {
				email: e.currentTarget.value,
				name: this.state.selectedUser.name
			},
			matchedUsers: (matchedUsers.length > 0) ? matchedUsers : []
		});
    },
	updateName: function(e) {
		this.setState({
			selectedUser: {
				email: this.state.selectedUser.email,
				name: e.currentTarget.value
			}
		});
	},
    searchUsersSelected: function(value) {
    	this.setState({
    		selectedUser: value.value,
    		matchedUsers: null
    	});

    	setTimeout(function() {
	    	document.activeElement.blur();
    	}, 0);
    },
    proceed: function(e) {
    	e.preventDefault();
    	this.getFlux().actions.page.update({
    		page: 'product'
    	});
    	this.getFlux().actions.user.update({
    		user: this.state.selectedUser
    	});
    }

});