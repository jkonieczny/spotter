'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var PageStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            currentPage:    'signin',
            history:        [],
            pages:          ['signin', 'user', 'masterProduct', 'product', 'confirmation', 'success']
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
        this.state.history.push(payload.page);

        this.state.currentPage = payload.page;

        this.emit('change');
    },
    goBack: function() {
        var newPage;

        var structure = {
            clientEdit: 'clientView',
            masterProduct: 'clientView',
            product: 'masterProduct',
            confirmation: 'product'
        };

        newPage = structure[this.state.currentPage];

        this.state.currentPage = (newPage) ? newPage : 'home';

        this.emit('change');
    }
});

module.exports = PageStore;
