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
		var state = this.getFlux().store('PageStore').getState();
		return {
			pages: state.pages,
			page: state.currentPage,
			back: (state.currentPage !== 'user')
		};
	},
    render: function() {
        return (
            <header>
            	<div className={cx( 'header_back', { 'hide' : (this.state.back === false) } )} onClick={this.goBack}></div>
                <h1 className="header_title">Spotter</h1>
                <div className="header_avatar"></div>
            </header>
        );
    },
    goBack: function(e) {
    	var index = this.state.pages.indexOf(this.state.page) - 1;
    	console.log(this.state, index);
    	this.getFlux().actions.page.update({
    		page: this.state.pages[index]
    	});
    }

});