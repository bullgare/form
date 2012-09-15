// requires jQuery and jQuery-ui core (to implement jquery-ui plugin)

(function($)
{
	"use strict";

	$.widget( 'bu.form',
		{
			_$form: null,
			_defaults: {},
			options:
			{
				allInputsSelector: 'input[type="text"], input[type="hidden"], input[type="checkbox"], input[type="radio"], select, textarea'
			},

			_create: function ()
			{
				var me = this,
					$me = $(me.element);

				me._$form = $me;
				me.storeDefaults();
			},

			/**
			 * Save current input state as default
			 */
			storeDefaults: function ()
			{
				var me = this;

				me._defaults = {};
				$(me.options.allInputsSelector, me._$form).each(function () {
					var $el = $(this);
					if ($el.attr('name'))
					{
						var value = null;
						if ($el.is(':checkbox')) {
							value = $el.attr('checked') ? true : false;
						}
						else if ($el.is(':radio'))
						{
							if ($el.attr('checked')) {
								value = $el.val();
							}
						}
						else if ($el.is('select')) {
							value = $('option:selected', $el).val();
						}
						else {
							value = $el.val();
						}

						if (value !== null) {
							me._defaults[$el.attr('name')] = value;
						}
					}
				});
			},

			/**
			 * Get saved defaults for inputs
			 * @return {Object}
			 */
			getDefaults: function ()
			{
				return this._defaults;
			},

			/**
			 * Filling form with data from given object
			 * @param Values
			 * @param PreventUsingDefaults
			 */
			fill: function (Values, PreventUsingDefaults)
			{
				var me = this,
					valuesToSet = PreventUsingDefaults ? Values : $.extend(true, {}, me._defaults, Values);

				me._$form.trigger('fill_started.bu', {values: Values, defaults: me._defaults, usingDefaults: ! PreventUsingDefaults});
				$(me.options.allInputsSelector, me._$form).each(function () {
					var $el = $(this),
						name = $el.attr('name');

					if ($el.is(':checkbox'))
					{
						if (name in valuesToSet && valuesToSet[name]) {
							$el.attr('checked', true);
						}
						else {
							$el.attr('checked', false);
						}
					}

					else if ($el.is(':radio'))
					{
						if (name in valuesToSet && valuesToSet[name] == $el.val()) {
							$el.attr('checked', true);
						}
						else {
							$el.attr('checked', false);
						}
					}

					else if ($el.is('select'))
					{
						if (name in valuesToSet) {
							$('option[value="' + valuesToSet[name] + '"]', $el).attr('selected', true);
						}
						else {
							$('option:selected', $el).removeAttr('selected');
						}
					}

					else
					{
						if (name in valuesToSet) {
							$el.val(valuesToSet[name]);
						}
						else {
							$el.val('');
						}
					}
				});

				me._$form.trigger('fill_ended.bu', {values: Values, defaults: me._defaults, usingDefaults: ! PreventUsingDefaults});
			}

			// TODO think about
			// TODO 1. saving form (which is quite easy)
			// TODO 2. showing errors near fields
			// TODO (then you have to control markup (like <span class="error error-name></span>"))
			// TODO and anyway someone likes showing hints all the time and highlight 'em on errors while others like showing hints on error occur

		}
	);
}( jQuery));