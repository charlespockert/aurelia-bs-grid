define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer.call(target); Object.defineProperty(target, key, descriptor); }

	var Pager = (function () {
		var _instanceInitializers = {};

		function Pager() {
			_classCallCheck(this, _Pager);

			_defineDecoratedPropertyDescriptor(this, 'onPageChanged', _instanceInitializers);

			_defineDecoratedPropertyDescriptor(this, 'numToShow', _instanceInitializers);

			this.nextDisabled = false;
			this.prevDisabled = false;

			_defineDecoratedPropertyDescriptor(this, 'showFirstLastButtons', _instanceInitializers);

			_defineDecoratedPropertyDescriptor(this, 'showJumpButtons', _instanceInitializers);

			this.page = 1;
			this.pageCount = 0;
			this.pages = [];
		}

		var _Pager = Pager;

		_createDecoratedClass(_Pager, [{
			key: 'changePage',
			value: function changePage(page) {

				var oldPage = this.page;

				this.page = this.cap(page);

				if (oldPage !== this.page) {
					this.onPageChanged(this.page);
				}
			}
		}, {
			key: 'update',
			value: function update(page, pagesize, totalItems) {
				this.page = page;
				this.totalItems = totalItems;
				this.pageSize = pagesize;

				this.createPages();
			}
		}, {
			key: 'cap',
			value: function cap(page) {
				if (page < 1) return 1;
				if (page > this.pageCount) return this.pageCount;

				return page;
			}
		}, {
			key: 'createPages',
			value: function createPages() {
				this.pageCount = Math.ceil(this.totalItems / this.pageSize);

				var numToRender = this.pageCount < this.numToShow ? this.pageCount : this.numToShow;

				var indicatorPosition = Math.ceil(numToRender / 2);

				var firstPageNumber = this.page - indicatorPosition + 1;

				if (firstPageNumber < 1) firstPageNumber = 1;

				var lastPageNumber = firstPageNumber + numToRender - 1;

				if (lastPageNumber > this.pageCount) {
					var dif = this.pageCount - lastPageNumber;

					firstPageNumber += dif;
					lastPageNumber += dif;
				}

				var pages = [];

				for (var i = firstPageNumber; i <= lastPageNumber; i++) {
					pages.push(i);
				};

				this.pages = pages;

				this.updateButtons();
			}
		}, {
			key: 'updateButtons',
			value: function updateButtons() {
				this.nextDisabled = this.page === this.pageCount;
				this.prevDisabled = this.page === 1;
			}
		}, {
			key: 'next',
			value: function next() {
				this.changePage(this.page + 1);
			}
		}, {
			key: 'nextJump',
			value: function nextJump() {
				this.changePage(this.page + this.numToShow);
			}
		}, {
			key: 'prev',
			value: function prev() {
				this.changePage(this.page - 1);
			}
		}, {
			key: 'prevJump',
			value: function prevJump() {
				this.changePage(this.page - this.numToShow);
			}
		}, {
			key: 'first',
			value: function first() {
				this.changePage(1);
			}
		}, {
			key: 'last',
			value: function last() {
				this.changePage(this.pageCount);
			}
		}, {
			key: 'onPageChanged',
			decorators: [_aureliaFramework.bindable],
			initializer: null,
			enumerable: true
		}, {
			key: 'numToShow',
			decorators: [_aureliaFramework.bindable],
			initializer: function initializer() {
				return 5;
			},
			enumerable: true
		}, {
			key: 'showFirstLastButtons',
			decorators: [_aureliaFramework.bindable],
			initializer: function initializer() {
				return true;
			},
			enumerable: true
		}, {
			key: 'showJumpButtons',
			decorators: [_aureliaFramework.bindable],
			initializer: function initializer() {
				return true;
			},
			enumerable: true
		}], null, _instanceInitializers);

		Pager = (0, _aureliaFramework.customElement)('pager')(Pager) || Pager;
		return Pager;
	})();

	exports.Pager = Pager;
});