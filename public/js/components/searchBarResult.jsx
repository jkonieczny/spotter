/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

module.exports = React.createClass({
    mixins: [FluxMixin],
    render: function() {
        var result = this.props.result;

        return (
            <li class="searchbar_result" onClick={this.onSelected}>
                {result[this.props.keys]}
            </li>
        );
    },

    onSelected: function(e) {
        this.getFlux().actions.searchSelected({
            constant: this.props.onSelectedAction,
            value: this.props.result
        });
    }

});