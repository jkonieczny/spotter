'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var PageStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            pages: ['user', 'product', 'confirmation', 'success'],
            currentPage: 'user'
        };

        this.bindActions(
            CONSTANTS.PAGE.UPDATE, this.updatePage
        );
    },
    getState: function(){
        return this.state;
    },
    updatePage: function(payload) {
        console.log(payload);
        this.state.currentPage = payload.page;
        this.emit('change');
    }
});

module.exports = PageStore;
