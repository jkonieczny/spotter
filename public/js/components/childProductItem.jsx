/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var CONSTANTS = require('../constants/constants');

module.exports = React.createClass({
    displayName: 'childProductItem.jsx',
    mixins: [FluxMixin],
    getInitialState: function() {
        return {
            confirm: false
        };
    },
    render: function() {
        var item;

        if (this.state.confirm === false) {
            item = (
                <div onClick={ this.selectedChild }>
                    <p>{ this.props.product.name }</p>
                    <p>{ this.props.product.merchant_name }</p>
                </div>
            );
        } else {
            item = (
                <div>
                    Added to basket!
                    <button onClick={ this.backToSearch }>Back to search</button>
                    <button onClick={ this.goToBasket }>Go to basket</button>
                </div>
            );
        }
    	return (
            <li>
                { item }
            </li>
    	);
    },
    selectedChild: function(e) {
        this.setState({ confirm: true });

        this.getFlux().actions.products.add({
            product: this.props.product
        });
    },
    backToSearch: function(e) {
        this.getFlux().actions.page.update({
            page: 'masterProduct'
        });
    },
    goToBasket: function(e) {
        this.getFlux().actions.page.update({
            page: 'confirmation'
        });
    }

});