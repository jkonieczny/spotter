/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

module.exports = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('PageStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		var flux	= this.getFlux();
		var state	= flux.store('PageStore').getState();
		var auth	= flux.store('AuthStore').getState();

		return {
			pages:				state.pages,
			page:				state.currentPage,
			back:				(state.currentPage !== 'home' && state.currentPage !== 'signin'),
			trainer:			auth.trainer
		};
	},
	render: function() {
		var avatar, background;

		if (this.state.trainer && this.state.trainer.picture) {
			background = {
				backgroundImage: 'url(' + this.state.trainer.picture + ')'
			}

			avatar = (<div className="header_avatar" style={background}></div>);
		}

		return (
			<header>
				<div className={cx( 'header_back', { 'hide' : (this.state.back === false), 'home' : (this.state.page === 'success') } )} onClick={this.goBack}></div>
				<h1 className="header_title">spotter</h1>
				{avatar}
			</header>
		);
	},
	goBack: function(e) {
		if (this.state.page === 'success') {
	    	this.getFlux().actions.page.update({
	    		page: 'home'
	    	});
		} else {
			this.getFlux().actions.page.goBack();
		}
	}

});