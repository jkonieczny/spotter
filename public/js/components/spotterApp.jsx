/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Header = require('./header.jsx'),
	User = require('./user.jsx'),
	Product = require('./product.jsx'),
	Confirmation = require('./confirmation.jsx'),
	Success = require('./success.jsx'),
	Email = require('./email.jsx'),
	SignIn = require('./signIn.jsx'),
	Home = require('./home.jsx');

module.exports = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('PageStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		var flux = this.getFlux();

		return {
			page: flux.store('PageStore').getState()
		};
	},
	componentWillMount: function() {
		console.log('componentWillMount');
        this.getFlux().actions.auth.autho.lock();
        this.getFlux().actions.auth.autho.get();
	},
	componentWillUpdate: function() {
		console.log('componentWillUpdate');
	},
    render: function() {
		var page;

		switch(this.state.page.currentPage) {
		    case 'confirmation':
		        page = (<Confirmation />);
		        break;
		    case 'product':
		        page = (<Product />);
		        break;
		    case 'success':
		        page = (<Success />);
		        break;
		    case 'email':
		        page = (<Email />);
		        break;
		    case 'home':
		        page = (<Home />);
		        break;
		    case 'user':
		        page = (<User />);
		        break;
		    default:
		        page = (<SignIn />);
		}

        return (
            <div>
            	<Header />
            	{page}
            </div>
        );
    }

});