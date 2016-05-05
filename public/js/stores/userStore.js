'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var UserStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            users: [
                {
                    name: 'Robert Daly',
                    id: 1,
                    trainer: 'Zeus',
                    avatar: 'rob',
                    email: 'robert@spotter.com'
                },
                {
                    name: 'Jan Konieczny',
                    id: 173829,
                    trainer: 'Zeus',
                    avatar: 'jan',
                    email: 'jan@spotter.com'
                },
                {
                    name: 'Julia Stent',
                    id: 3,
                    trainer: 'Zeus',
                    avatar: 'julia',
                    email: 'julia@spotter.com'
                },
                {
                    name: 'Arnold Schwarzenegger',
                    id: 173830,
                    trainer: 'Zeus',
                    avatar: 'arnold',
                    email: 'arnold@spotter.com'
                }
            ]
        };

        this.bindActions(
            CONSTANTS.USERS.GET, this.getUser,
            CONSTANTS.USER.UPDATE, this.userUpdate
        );
    },
    getState: function(){
        return this.state;
    },
    getUser: function(payload) {
        this.emit('change');
    },
    userUpdate: function(payload) {
        this.state.client = payload.user;
        this.emit('change');
    }
});

module.exports = UserStore;
