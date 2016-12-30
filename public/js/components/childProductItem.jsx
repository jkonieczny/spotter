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
        var item, discounts;

        if (this.state.confirm === false) {
            var itemImage;
            var product = this.props.product;

            if (product.image) {
                itemImage = (
                    <span className="child_item_image" style={ { backgroundImage: 'url(' + product.image + ')'}  }></span>
                );
            }

            if (product.discount) {
                if (product.discount && product.discount.discount_type === 'percent') {
                    discounts = (
                        <div className="child_item_discounts"> 
                            { product.discount.name }
                        </div>
                    );
                }
            }

            item = (
                <div className="child_item">
                    { itemImage }
                    <h2>{ this.props.product.name }</h2>
                    { discounts }
                    <div className="child_item_details">
                        <div className="child_item_earn">
                            <small>You earn:</small>
                            £{ this.props.product.expected_commission }
                        </div>
                        <div className="child_item_price">
                            <small>Price:</small>
                            £{ this.props.product.price }
                        </div>
                    </div>
                    <div className="child_item_buy"><small>Buy from:</small>{ this.props.product.merchant_name }</div>
                    <button className="child_item_add" onClick={ this.selectedChild }>Add</button>
                </div>
            );
        } else {
            item = (
                <div className="child_item_confirm">
                    <strong>Added to basket!</strong>
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