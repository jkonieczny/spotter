/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

var ItemGrid = require('./itemGrid.jsx');

module.exports = React.createClass({
	displayName: 'email.jsx',
	mixins: [FluxMixin, StoreWatchMixin('UserStore', 'ProductStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		var flux = this.getFlux();
		return {
			selectedUser: flux.store('UserStore').getState().client,
			selectedProducts: flux.store('ProductStore').getState().selectedProducts
		};
	},
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {
		var avatarClasses = {
			user_avatar: true
		};
		var avatarInlineCSS = {};

		if (this.state.selectedUser && this.state.selectedUser.avatar) {
			avatarClasses.user_selected 	= true;
			avatarInlineCSS.backgroundImage = 'url(images/avatars/trainer-large.jpg)';
		}

        return (
            <div className="page page_email">
                <div className={cx(avatarClasses)} style={avatarInlineCSS}></div>
                <div>
                	<p>Hi {this.state.selectedUser.fname}</p>
					<p>Your trainer Rob has chosen these products specifically for you through Spotter. These are Rob's recommendations for the best sports supplements to help you achieve your goals.</p>
					<p>We know you're busy doing the hard work in the gym, so here at Spotter we've done the hard work of finding the very best sites for you to buy from. Just click the buttons below to purchase, and Rob will be notified that you followed his advice.</p>
                </div>
                <div>
                	<ItemGrid />
                </div>
                <div>
					<p>Spotter finds the best deals from the top supplements brands in the UK, so your personal trainer can recommend products to you knowing you’ll get a great price when you buy.</p>
				</div>
            </div>
        );
    }
});