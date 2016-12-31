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
        var masterProduct = this.props.masterProduct;
        var discount;

        if (masterProduct.extra) {
            if (masterProduct.extra.discount) {
                if (masterProduct.extra.discount.discount_type === 'percent') {
                    discount = (
                        <span className="master_product_offer">{ masterProduct.extra.discount.name }</span>
                    );
                }
            } else if (masterProduct.extra.minPrice) {
                discount = (
                    <span className="master_product_offer">from £{ masterProduct.extra.minPrice }</span>
                );
            }
        }

    	return (
            <li key={ masterProduct.id } onClick={ this.selectedMaster }>
                <strong>{ masterProduct.name }</strong> ({ masterProduct.deals })
                { discount }
            </li>
    	);
    },
    selectedMaster: function(e) {
        var flux = this.getFlux();

        flux.actions.masterProducts.selected({
            masterProduct: this.props.masterProduct
        });

        flux.actions.childProducts.get({
            id: this.props.masterProduct.id,
            value: this.props.value
        });

        flux.actions.page.update({
            page: 'product'
        });
    }

});