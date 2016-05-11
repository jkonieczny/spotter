'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var UserStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            users: [
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
        if (!payload.user.fname) {
            var name = payload.user.name.split(' ');
            payload.user.fname = name[0];
            payload.user.lname = name[name.length - 1];
        }
        this.state.client = payload.user;
        this.emit('change');
    }
});

module.exports = UserStore;
