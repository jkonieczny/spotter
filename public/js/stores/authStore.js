'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var SpotterAPI = require('../lib/spotter');

var AuthStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            tokens:     null,
            trainer:    null
        };

        this.bindActions(
            CONSTANTS.AUTH.AUTHO.GET, this.autho.getTrainer,
            CONSTANTS.AUTH.AUTHO.LOCK, this.autho.createLock,
            CONSTANTS.AUTH.AUTHO.SHOW, this.autho.show,

            CONSTANTS.AUTH.SPOTTER.GET, this.spotter.getTrainer
        );
    },
    autho: {
        createLock: function() {
            this.state.lock = new Auth0Lock('YDvRFV8XQoX3fuF1X65l8RqMSmCKHGOg', 'fitflow.eu.auth0.com');
        },
        show: function() {
            this.state.lock.show();
        },
        getTrainer: function() {
            var tokens = localStorage.getItem('tokens');

            if (this.state.lock && this.state.lock.parseHash && window.location.hash.length > 0) {
                this.state.tokens = this.state.lock.parseHash(window.location.hash);
                localStorage.setItem('tokens' , JSON.stringify(this.state.tokens));
            } else if (tokens) {
                this.state.tokens = JSON.parse(tokens);
            } else {
                this.signOut();
            }

            console.log('this.state.trainer', this.state.trainer);

            if (this.state.tokens) {
                setTimeout(function() {
                    this.flux.actions.auth.spotter.get();
                }.bind(this), 0);
            }
        }
    },
    spotter: {
        getTrainer: function() {
            SpotterAPI.getTrainer(function(data) {
                console.log('getTrainer callback!', data);
                if (data.id) {
                    this.state.trainer = data;

                    this.flux.actions.page.update({
                        page: 'home'
                    });

                    this.flux.actions.clients.get();

                } else if (data.code && data.description) {
                    alert(data.description);
                } else {
                    alert('Sorry, something has gone wrong!');
                }
            }.bind(this));
        }
    },
    signOut: function() {
        localStorage.clear();

        this.state.tokens   = null;
        this.state.trainer  = null;
    },
    getState: function(){
        return this.state;
    }
});

module.exports = AuthStore;
