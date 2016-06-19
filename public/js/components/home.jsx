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
	displayName: 'signIn.jsx',
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    getInitialState: function() {
        return {
            trainer: {}
        };
    },
    render: function() {
        var avatarClasses = {
            user_avatar: true
        };
        var avatarInlineCSS = {};

        if (this.state.trainer && this.state.trainer.avatar) {
            avatarClasses.user_selected     = true;
            avatarInlineCSS.backgroundImage = 'url(images/avatars/' + this.state.trainer.avatar + '.jpg)';
        }

        return (
            <div className="page signin">
	            <div className={cx(avatarClasses)} style={avatarInlineCSS}></div>
                <h2>Homepage</h2>
                <form>
                    <label>
                        <button type="submit" onClick={this.proceed}>Add Client</button>
                    </label>
                    <label>
                        <button type="submit" onClick={this.proceed}>View Clients</button>
                    </label>
	                <label>
	                	<button type="submit" onClick={this.proceed}>Settings</button>
	                </label>
                </form>
            </div>
        );
    },
    proceed: function(e) {
    	e.preventDefault();
    	this.getFlux().actions.page.update({
    		page: 'product'
    	});
    }

});