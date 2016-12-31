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
	displayName: 'clientsView.jsx',
	mixins: [FluxMixin, StoreWatchMixin('ClientStore')],
    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            clients:    flux.store('ClientStore').getState().clients,
            trainer:    flux.store('AuthStore').getState().trainer,
            mode:       null
        };
    },
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {
        var clients = (<li>You currently have no clients</li>);

        if (this.state.clients) {
            clients = [];

            this.state.clients.forEach(function(client) {
                var picture = (client.picture) ? { backgroundImage:'url(' + client.picture  + ')' } : {};

                clients.push(
                    <li key={client.id} className="client_list_client" onClick={this.selectClient.bind(this, client)}>
                        <span style={ picture } />
                        {client.name}
                    </li>
                );
            }.bind(this));
        }

        var pageClasses = {
            page: true,
            signin: true
        };

        var buttons = (
            <div>
                <a href="#" onClick={this.editClients}>Edit clients</a>
                <p/>
                <a href="#" onClick={this.deleteClients}>Select and delete clients</a>
            </div>
        );

        if (this.state.mode) {
            pageClasses[this.state.mode] = true;
            buttons = (
                <div>
                    <button onClick={this.modeClear}>Done</button>
                </div>
            )
        }

        return (
            <div className={cx(pageClasses)}>
	            <Avatar person={this.state.trainer} />
                <h2 className="center">{this.state.trainer.name}'s clients</h2>
                <p/>
                <ul>
                    {clients}
                </ul>
                <p/>
                {buttons}
            </div>
        );
    },
    selectClient: function(client, e) {
    	e.preventDefault();

        if (this.state.mode === 'delete') {
            if (window.confirm('Are you sure you want to delete ' + client.name + '?')) {
                this.getFlux().actions.client.delete({
                    client: client
                });
            }
        } else if (this.state.mode === 'edit') {
            this.getFlux().actions.client.set({
                client: client
            });

            this.getFlux().actions.page.update({
                page: 'clientEdit'
            });
        } else {
            this.getFlux().actions.client.set({
                client: client
            });
            this.getFlux().actions.page.update({
                page: 'masterProduct'
            });
        }
    },
    editClients: function(e) {
        e.preventDefault();

        this.setState({
            mode: 'edit'
        });
    },
    deleteClients: function(e) {
        e.preventDefault();

        this.setState({
            mode: 'delete'
        });
    },
    modeClear: function(e) {
        e.preventDefault();

        this.setState({
            mode: null
        });
    }

});