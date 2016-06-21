'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var SpotterAPI = require('../lib/spotter');

var ClientStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            clients: []
        };
        /*
        this.state = {
            clients: [
                {
                    name: 'Robert Daly',
                    fname: 'Robert',
                    lname: 'Daly',
                    id: 1,
                    trainer: 'Zeus',
                    avatar: 'rob',
                    email: 'robert@gmail.com'
                },
                {
                    name: 'Jan Konieczny',
                    fname: 'Jan',
                    lname: 'Konieczny',
                    id: 173829,
                    trainer: 'Zeus',
                    avatar: 'jan',
                    email: 'jan@hotmail.com'
                },
                {
                    name: 'Julia Stent',
                    fname: 'Julia',
                    lname: 'Stent',
                    id: 3,
                    trainer: 'Zeus',
                    avatar: 'julia',
                    email: 'julia@gmail.com'
                },
                {
                    name: 'Arnold Schwarzenegger',
                    fname: 'Arnold',
                    lname: 'Schwarzenegger',
                    id: 173830,
                    trainer: 'Zeus',
                    avatar: 'arnold',
                    email: 'arnold@yahoo.com'
                }
            ]
        };
        */

        this.bindActions(
            CONSTANTS.CLIENT.SET, this.clientsSet,
            CONSTANTS.CLIENTS.GET, this.clientsGet
        );
    },
    getState: function(){
        return this.state;
    },
    clientsGet: function(payload) {
        console.log('clientsGet');

        SpotterAPI.getClients(function(data) {
            console.log('GOT CLIENTS', data);
            if (data.total && data.total > 0) {
                this.state.clients = data.data;
            }
        }.bind(this));

        this.emit('change');
    },
    clientsSet: function(payload) {
        console.log('clientsSet', payload);
        this.state.client = payload.client;

        this.emit('change');
    }
});

module.exports = ClientStore;
