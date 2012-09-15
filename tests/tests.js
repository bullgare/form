"use strict";
var expectedDefaults = {
	name : '',
	lastname : '',
	age : '1',
	hobby_cooking : false,
	hobby_walking : false,
	hobby_working : false,
	about : 'Type something',
	some : '12'
};
describe('while initialization', function () {
	var $form;

	beforeEach( function () {
		$form = $('#js-form').
			form().
			form('destroy').
			form();
	} );

	it('fills defaults with form values', function () {
		var defaults = $form.form('getDefaults');
		expect(defaults).toEqual(expectedDefaults);
	});
} );

describe('on form fill', function () {
	var $form;

	beforeEach( function () {
		$form = $('#js-form').
			form()/*.
			form('destroy').
			form()*/;
	} );

	it('fills all inputs', function () {
		var values = {
			name : 'nnn',
			age : '5',
			sex : 'm',
			hobby_cooking : true,
			hobby_working : true,
			about : 'Typing',
			some : '15'
		};
		$form.form('fill', values);

		expect($('input[name="name"]').val()).toEqual('nnn');

		// default
		expect($('input[name="lastname"]').val()).toEqual('');

		// radio
		expect($('input[name="sex"]:checked').val()).toEqual('m');

		// checkboxes
		expect($('input[name="hobby_cooking"]:checked').length).toEqual(1);
		expect($('input[name="hobby_walking"]:checked').length).toEqual(0);
		expect($('input[name="hobby_working"]:checked').length).toEqual(1);

		// textarea
		expect($('textarea[name="about"]').val()).toEqual('Typing');

		// hidden
		expect($('input[name="some"]').val()).toEqual('15');
	});

	it('resets all inputs to defaults when filling with empty object', function () {
		var values = {};
		$form.form('fill', values);

		expect($('input[name="name"]').val()).toEqual(expectedDefaults.name);

		// default
		expect($('input[name="lastname"]').val()).toEqual(expectedDefaults.lastname);

		// radio
		expect($('input[name="sex"]:checked').length).toEqual(0);

		// checkboxes
		expect($('input[name="hobby_cooking"]:checked').length).toEqual(0);
		expect($('input[name="hobby_walking"]:checked').length).toEqual(0);
		expect($('input[name="hobby_working"]:checked').length).toEqual(0);

		// textarea
		expect($('textarea[name="about"]').val()).toEqual(expectedDefaults.about);

		// hidden
		expect($('input[name="some"]').val()).toEqual(expectedDefaults.some);
	});
	// TODO test triggering
} );
