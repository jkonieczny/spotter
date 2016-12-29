/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

module.exports = React.createClass({
	displayName: 'signIn.jsx',
	mixins: [FluxMixin],
	componentDidMount: function() {
		window.scrollTo(0,0);

        setTimeout(function() {
            this.getFlux().actions.auth.init();
        }.bind(this));
	},
    render: function() {
        return (
            <div className="page signin">
	            <div className="user_avatar"></div>
                <div id="auth"></div>
            </div>
        );
    }

});