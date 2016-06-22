'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var PageStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            currentPage:    'signin',
            history:        [],
            pages:          ['signin', 'user', 'product', 'confirmation', 'success']
        };

        this.bindActions(
            CONSTANTS.PAGE.GOBACK, this.goBack,
            CONSTANTS.PAGE.UPDATE, this.updatePage
        );
    },
    getState: function(){
        return this.state;
    },
    updatePage: function(payload) {
        console.log('updatePage', payload);
        this.state.history.push(payload.page);

        this.state.currentPage = payload.page;

        this.emit('change');
    },
    goBack: function() {
        var newPage = this.state.history[this.state.history.length - 2];
        console.log('newPage', newPage);
        this.state.currentPage = (newPage) ? newPage : 'home';

        this.state.history = this.state.history.slice(0, this.state.history.length - 2);

        this.emit('change');
    }
});

module.exports = PageStore;
