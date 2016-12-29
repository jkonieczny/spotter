/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var CONSTANTS = require('../constants/constants');

module.exports = React.createClass({
    displayName: 'masterProductItem.jsx',
    mixins: [FluxMixin],
    render: function() {
    	return (
            <li key={ this.props.masterProduct.id } onClick={ this.selectedMaster }>
                <strong>{ this.props.masterProduct.name }</strong> ({ this.props.masterProduct.deals })
            </li>
    	);
    },
    selectedMaster: function(e) {
        this.getFlux().actions.masterProducts.selected({
            masterProduct: this.props.masterProduct
        });

        this.getFlux().actions.childProducts.get({
            id: this.props.masterProduct.id,
            value: this.props.value
        });

        this.getFlux().actions.page.update({
            page: 'product'
        });
    }

});