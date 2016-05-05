/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var SearchBar = require('./searchBar.jsx');

module.exports = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('ProductStore')],
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
    render: function() {
		var productMatches;

		if (this.state.productMatches) {
			productMatches = (<SearchBar keys="name" matches={ this.state.productMatches } onSelectedAction={this.searchProductsSelected} />)
		}

		if (this.state.selectedProducts.length > 0) {
			console.log('selectedProducts!!!');
		}

        return (
            <div>
                <form>
                	<label>
                		Select brand
                		<select defaultValue="select" defaultChecked="select" onChange={this.selectBrand}>
	                		<option value="select" disabled>Select a brand</option>
                			<option value="bulk_powders">Bulk Powders</option>
                			<option value="maxinutrition">Maxinutrition</option>
                			<option value="myprotein">MyProtein</option>
                			<option value="optimum_nutrition">Optimum Nutrition</option>
                			<option value="phd">PHD</option>
                			<option value="usn">USN</option>
                		</select>
                	</label>
                	<label>
                		Select Product
                		<input id="product_search" type="text" placeholder="Search for a product" value={this.state.product.name} onChange={this.searchProducts} disabled={(!this.state.brand)} />
                		{ productMatches }
                	</label>
                	<button type="submit" onClick={ this.addItem } disabled={!(this.state.product && this.state.product.name.length > 0)}>Add Item</button>
                </form>
            </div>
        );
    },
    selectBrand: function(e) {
    	this.setState({
    		brand: e.currentTarget.value
    	});

    	setTimeout(function() {
    		document.getElementById('product_search').focus();
    	},0);
    },
    searchProducts: function(e) {
    	var value = e.currentTarget.value.toString().toLowerCase();

    	if (value.length > 0) {
	    	var products = this.getFlux().store('ProductStore').getState().products[this.state.brand];

	    	var productMatches = products.filter(function(product) {
	    		return (product.name.toLowerCase().indexOf(value) > -1);
	    	});

	    	this.setState({
	    		productMatches: productMatches
	    	});
	    }
    },
    searchProductsSelected: function(value) {
    	console.log('searchProductsSelected', value);

    	this.setState({
    		productMatches: null,
    		product: value.value
    	});
    },
    addItem: function(e) {
    	e.preventDefault();

    	this.getFlux().actions.products.add({
    		product: this.state.product
    	});
    }

});