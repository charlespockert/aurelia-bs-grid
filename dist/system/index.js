System.register([], function (_export) {
	'use strict';

	_export('configure', configure);

	function configure(aurelia) {
		aurelia.globalResources('./grid/grid');
	}

	return {
		setters: [],
		execute: function () {}
	};
});