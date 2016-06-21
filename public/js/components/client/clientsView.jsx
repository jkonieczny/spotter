/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx          = require('classnames');

var CONSTANTS   = require('../../constants/constants');

var Avatar      = require('../avatar.jsx');

module.exports = React.createClass({
	displayName: 'trainerDetails.jsx',
	mixins: [FluxMixin, StoreWatchMixin('ClientStore')],
    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            clients: flux.store('ClientStore').getState().clients,
            trainer: flux.store('AuthStore').getState().trainer
        };
    },
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {
        var clients = (<li>You currently have no clients</li>);

        if (this.state.clients) {
            console.log(this.state.clients);
            clients = [];

            this.state.clients.forEach(function(client) {
                clients.push(
                    <li key={client.id} className="client_list_client" onClick={this.selectClient.bind(this, client)}>
                        <img src={client.picture} />
                        {client.name}
                    </li>
                );
            }.bind(this));
        }

        return (
            <div className="page signin">
	            <Avatar person={this.state.trainer} />
                <h2 className="center">{this.state.trainer.name}'s clients</h2>
                <p/>
                <ul>
                    {clients}
                </ul>
            </div>
        );
    },
    selectClient: function(client, e) {
        console.log('selectClient', e);
    	e.preventDefault();
        this.getFlux().actions.client.set({
            client: client
        });
        this.getFlux().actions.page.update({
            page: 'product'
        });
    }

});