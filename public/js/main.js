/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var SpotterApp = require('../components/spotterApp.jsx');

var App = {
	init: function() {
		console.log(999, document.getElementById('content'));
		console.log(React);
		ReactDOM.render(
		  <SpotterApp/>,
		  document.getElementById('content')
		);
	}
};

module.exports = App;