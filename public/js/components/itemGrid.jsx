/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

module.exports = React.createClass({
    displayName: 'itemGrid.jsx',
	mixins: [FluxMixin, StoreWatchMixin('UserStore', 'ProductStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		return {
            selectedProducts: this.getFlux().store('ProductStore').getState().selectedProducts
        };
	},
    render: function() {
        if (this.state.selectedProducts.length > 0) {
            var selectedProducts = [];

            if (this.state.selectedProducts.length > 0) {
                this.state.selectedProducts.forEach(function(product) {
                    var randomFluxPrice = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
                    var topPrice = product.price * 1.18 + randomFluxPrice;

                    selectedProducts.push(
                        (
                            <div key={ product.id } className="item_grid center">
                                <div className="item_grid_img" style={{backgroundImage: 'url(' + product.image + '), url(images/icon.png)'}}>
                                    <div className="item_grid_saving">
                                        { Math.round((topPrice - product.price) / topPrice * 100) }
                                        <sup>%</sup>
                                    </div>
                                </div>
                                {product.name}
                                <div className="item_price">&pound;{product.price.toFixed(2)}</div>
                                <button onClick={ this.proceedBuy }>Buy</button>
                                <ul className="item_grid_others left">
                                    <li>
                                        <a href="#" onClick={ this.proceedBuy }>
                                            <span>Discount Nutrition</span>
                                            <span>&pound;{ (product.price * 1.08).toFixed(2)}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={ this.proceedBuy }>
                                            <span>Protein Online</span>
                                            <span>&pound;{ (product.price * 1.12).toFixed(2)}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={ this.proceedBuy }>
                                            <span>BuySupplements</span>
                                            <span>&pound;{ topPrice.toFixed(2)}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )
                    );
                }.bind(this));
            }
        }

        return (
            <div className={cx({item_grid_parent: true, item_grid_single: (this.state.selectedProducts && this.state.selectedProducts.length === 1) })}>
                { selectedProducts }
            </div>
        );
    },
    proceedBuy: function(e) {
        e.preventDefault();
        console.log('proceedBuy');
    }

});