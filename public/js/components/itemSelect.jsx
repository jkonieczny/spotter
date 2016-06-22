/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var SearchBar = require('./searchBar.jsx');

var originalState = {
	brand: null,
	product: { name: '' }
};

module.exports = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('ProductStore')],
    displayName: 'itemSelect.jsx',
	getInitialState: function() {
		return {
			brand: null,
			product: { name: '' }
		};
	},
	getStateFromFlux: function() {
		return {
			selectedProducts: this.getFlux().store('ProductStore').getState().selectedProducts
		};
	},
    componentDidMount: function() {
        this.getFlux().store('ProductStore').on('change:updateProduct', this.updateProductList);
    },
    componentWillUnmount: function() {
        this.getFlux().store('ProductStore').off('change:updateProduct', this.updateProductList);
    },
    render: function() {
		var productMatches;

		if (this.state.productMatches) {
			productMatches = (<SearchBar reactKeys="id" keys="name" matches={ this.state.productMatches } onSelectedAction={this.searchProductsSelected} />)
		}

        return (
            <div>
                <form>
                	<label>
                        Brand
                		<select defaultValue="select" defaultChecked="select" onChange={this.selectBrand}>
	                		<option value="select" disabled hidden>e.g. USN...</option>
                			<option value="1227">Bulk Powders</option>
                			<option value="972">Maxinutrition</option>
                			<option value="1165">MyProtein</option>
                			<option value="1192">Optimum Nutrition</option>
                			<option value="994">PHD</option>
                			<option value="1078">USN</option>
                		</select>
                	</label>
                	<label>
                		Product
                		<input id="product_search" type="text" placeholder="e.g. Pure Protein GF-1..." value={this.state.product.name}  autoComplete="off" autoCorrect="off" autoCapitalize="off" onChange={this.searchProducts} disabled={(!this.state.brand)} />
                		{ productMatches }
                	</label>
                	<button type="submit" onClick={ this.addItem } disabled={!(this.state.product && this.state.product.id)}>Add Item</button>
                </form>
            </div>
        );
    },
    selectBrand: function(e) {
    	this.setState({
    		brand: e.currentTarget.value
    	});

        if (this.state.product.name.length > 0) {
            this.getFlux().actions.products.search({
                brand_id:       this.state.brand,
                search_term:    this.state.product.name
            });
        }

    	setTimeout(function() {
    		document.getElementById('product_search').focus();
    	},0);
    },
    searchProducts: function(e) {
    	var productMatches = [];
    	var value = e.currentTarget.value.toString().toLowerCase();

    	if (value.length > 0) {
            this.getFlux().actions.products.search({
                brand_id:       this.state.brand,
                search_term:    value
            });
            /*
	    	var products = this.getFlux().store('ProductStore').getState().products[this.state.brand];

	    	var productMatches = products.filter(function(product) {
	    		return (product.name.toLowerCase().indexOf(value) > -1);
	    	});
            */
	    }

    	this.setState({
    		product: { name: e.currentTarget.value }
    	});
    },
    updateProductList: function() {
        this.setState({
            productMatches: this.getFlux().store('ProductStore').getState().products
        });
    },
    searchProductsSelected: function(value) {
    	this.setState({
    		productMatches: null,
    		product: value.value
    	});

    	setTimeout(function() {
	    	document.activeElement.blur();
    	}, 0);
    },
    addItem: function(e) {
    	e.preventDefault();

    	var productID = this.state.product.id;

    	var dupeProducts = this.state.selectedProducts.filter(function(product) {
    		return (productID === product.id);
    	});

    	if (dupeProducts.length > 0) {
    		alert('You already have added ' + this.state.product.name);
    	} else {
	    	this.getFlux().actions.products.add({
	    		product: this.state.product
	    	});
	    }

	    // Override a bug where React keeps the brand selected, but doesn't realise it
	    // https://github.com/facebook/react/issues/4618
	    var newState = JSON.parse(JSON.stringify(originalState));
	    newState.brand = this.state.brand;

    	this.setState(newState);
    }

});