System.register([], function (_export) {
	"use strict";

	var GridColumn;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [],
		execute: function () {
			GridColumn = function GridColumn(config, template) {
				_classCallCheck(this, GridColumn);

				this.specialColumns = ["heading", "nosort"];

				this.template = template;
				this.field = config.field;

				if (!this.field) throw new Error("field is required");

				this.heading = config.heading || config.field;
				this.nosort = config.nosort || false;
				this.filterValue = "";

				for (var prop in config) {
					if (config.hasOwnProperty(prop) && this.specialColumns.indexOf(prop) < 0) {
						this[prop] = config[prop];
					}
				}
			};

			_export("GridColumn", GridColumn);
		}
	};
});