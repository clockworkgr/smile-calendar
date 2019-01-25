// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "smileCalendar",
			defaults = {
				propertyName: "value"
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				this.buildCalendarHTML();
			},
			buildCalendarHTML: function( ) {

				// some logic
				var classes= $( this.element ).attr('class');
				var start=Number(moment().startOf('month').format('d'));
				var end=Number(moment().endOf('month').format('D'));
				var header="";
				for(var i=0;i<7;i++) {
					header=header+"<th>"+moment().day(i).format('dd')+"</th>";
				}
				var j=0;
				var offset=start;
				var rows=0;
				var cal='';
				if ((offset+end)%7>0) {
					rows=Math.floor(((offset+end)/7)+1);
				}else{
					rows=Math.floor((offset+end)/7);
				}
				console.log(offset);
				console.log(end);
				console.log(rows);
				var cell=0;
				var day=1;
				while (j<rows) {
					cal=cal+"<tr>";
					for(var k=0;k<7;k++) {
						if (cell<start || day>end) {
							cal=cal+"<td></td>";
						}else{
							cal=cal+"<td>"+day+"</td>";
							day++;
						}
						cell++;
					}					
					cal=cal+"</tr>";
					j++;
				}
				var month
				var calendar=$('<div class="'+classes+'"><input type="hidden" name="" id=""/><div class="popOutCal"><table><thead><tr>'+header+'</tr></thead>'+cal+'</table></div></div>');
				$( this.element ).replaceWith(calendar);
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
