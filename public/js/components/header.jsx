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
		var flux = this.getFlux();
		console.log(123, flux.store('PageStore').getState());
		return {
			back: (flux.store('PageStore').getState().currentPage !== 'user')
		};
	},
    render: function() {
    	console.log(this.state.back)
        return (
            <header>
            	<div className={cx( 'header_back', { 'hide' : (this.state.back === false) } )}></div>
                <h1 className="header_title">Spotter</h1>
            </header>
        );
    }

});