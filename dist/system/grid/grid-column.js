System.register([], function (_export) {
	"use strict";

	var GridColumn;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [],
		execute: function () {
			GridColumn = function GridColumn(config, template) {
				_classCallCheck(this, GridColumn);

				this.template = template;
				this.field = config.field;

				if (!this.field) throw new Error("field is required");

				this.heading = config.heading || config.field;
				this.nosort = config.nosort || false;
			};

			_export("GridColumn", GridColumn);
		}
	};
});