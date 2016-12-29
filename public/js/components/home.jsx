/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

var Avatar      = require('./avatar.jsx');

module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('AuthStore')],
	displayName: 'home.jsx',
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    getStateFromFlux: function() {
        return {
            trainer: this.getFlux().store('AuthStore').getState().trainer
        };
    },
    render: function() {
        return (
            <div className="page home light_blue">
                <Avatar person={this.state.trainer} />
                <h2 className="center">Welcome back<br/>{ this.state.trainer.name }</h2>
                <p/>
                <form>
                    <label>
                        <button className="green_btn add_icon" type="submit" onClick={this.proceedAddClient}>Add Client</button>
                    </label>
                    <label>
                        <button className="clients_icon" type="submit" onClick={this.proceedViewClients}>View Clients</button>
                    </label>
	                <label>
	                	<button className="trans_btn cog_icon" type="submit" onClick={this.proceedProfile}>Your Profile</button>
	                </label>
                </form>
                <div className="lazy_load_fonts">Spotter &copy;</div>
            </div>
        );
    },
    proceedAddClient: function(e) {
    	e.preventDefault();
    	this.getFlux().actions.page.update({
    		page: 'clientAdd'
    	});
    },
    proceedViewClients: function(e) {
        e.preventDefault();
        this.getFlux().actions.page.update({
            page: 'clientView'
        });
    },
    proceedProfile: function(e) {
        e.preventDefault();
        this.getFlux().actions.page.update({
            page: 'profile'
        });
    },

});