/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('UserStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		return {};
	},
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {
        return (
            <div className="confirmation">
                Confirmation
            </div>
        );
    }

});