'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var PageStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            pages: ['signin', 'user', 'product', 'confirmation', 'success'],
            currentPage: 'signin',
            previousPage: null
        };

        this.bindActions(
            CONSTANTS.PAGE.UPDATE, this.updatePage
        );
    },
    getState: function(){
        return this.state;
    },
    updatePage: function(payload) {
        this.state.previousPage = this.state.currentPage;
        this.state.currentPage = payload.page;
        this.emit('change');
    }
});

module.exports = PageStore;
