/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../../constants/constants');

module.exports = React.createClass({
	displayName: 'trainerDetails.jsx',
	mixins: [FluxMixin],
    getInitialState: function() {
        return {
            client: {
                fname: null,
                lname: null,
                email: null
            }
        };
    },
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {
        return (
            <div className="page signin">
	            <div className="user_avatar"></div>
                Add a client
                <form>
                    <label>
                        First Name
                        <input type="text" placeholder="First Name" onChange={this.update.bind(this, 'fname')} />
                    </label>
                    <label>
                        Last Name
                        <input type="text" placeholder="Last Name" onChange={this.update.bind(this, 'lname')} />
                    </label>
                    <label>
                        Email
                        <input type="email" placeholder="Email" onChange={this.update.bind(this, 'email')} />
                    </label>
                    <label>
                        Upload an image
                        <input ref="file" type="file" accept="image/*" capture="camera" />
                    </label>
	                <label>
	                	<button type="submit" onClick={this.proceed}>Update client details</button>
	                </label>
                </form>
            </div>
        );
    },
    update: function(field, e) {
        this.state.client[field] = e.currentTarget.value;
    },
    proceed: function(e) {
        console.log('proceed');
    	e.preventDefault();

        var flux = this.getFlux();

        var missingValues = [];
        var fieldNames = {
            fname: 'first name',
            lname: 'last name',
            email: 'email'
        }

        var client = this.state.client;

        Object.keys(client).forEach(function(key) {
            if (!client[key] || client[key].length === 0) {
                missingValues.push(fieldNames[key]);
            }
        });

        if (missingValues.length > 0) {
            alert('Please enter ' + missingValues.join(', '));
            return;
        }

        var file = this.refs.file.files[0]
        if (file) {
            //alert('Your client image will upload in the background, you will be notified when it has finished');
            flux.store('ClientStore').once('change:clientAdded', function() {
                console.log('change:clientAdded');
                flux.actions.client.image.add({
                    file:   file,
                    id:     this.getFlux().store('ClientStore').getState().lastAdded.id
                });
            }.bind(this));
        }

        flux.store('ClientStore').once('change:clientsGot', function() {
            flux.actions.page.update({
                page: 'clientView'
            });
        }.bind(this));

        flux.actions.client.add({
            client: client
        });
    }

});