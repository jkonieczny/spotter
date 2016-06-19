'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var SpotterAPI = require('../lib/spotter');

var AuthStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            trainer: null
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
            this.state.lock = new Auth0Lock('eUxDYzocFp4M0gwKetW5gj5SjzULG9of', 'fitflow.eu.auth0.com');
        },
        show: function() {
            this.state.lock.show();
        },
        getTrainer: function() {
            var trainer = localStorage.getItem('trainer');

            if (this.state.lock && this.state.lock.parseHash && window.location.hash.length > 0) {
                this.state.trainer = this.state.lock.parseHash(window.location.hash);
                localStorage.setItem('trainer' , JSON.stringify(this.state.trainer));
            } else if (trainer) {
                this.state.trainer = JSON.parse(trainer);
            } else {
                this.state.trainer = null;
            }

            console.log('this.state.trainer', this.state.trainer);

            if (this.state.trainer) {
                console.log(this.flux.actions);
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
            });
        }
    },
    getState: function(){
        return this.state;
    }
});

module.exports = AuthStore;
