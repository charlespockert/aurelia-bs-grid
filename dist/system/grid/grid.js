System.register(['aurelia-framework', './grid-column'], function (_export) {
	'use strict';

	var bindable, inject, BindingEngine, customElement, processContent, TargetInstruction, ViewCompiler, ViewSlot, ViewResources, Container, GridColumn, Grid;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	function processUserTemplate(element) {

		var cols = [];

		var rowElement = element.querySelector("grid-row");
		var columnElements = Array.prototype.slice.call(rowElement.querySelectorAll("grid-col"));

		columnElements.forEach(function (c) {
			var attrs = Array.prototype.slice.call(c.attributes),
			    colHash = {};
			attrs.forEach(function (a) {
				return colHash[a.name] = a.value;
			});

			var col = new GridColumn(colHash, c.innerHTML);

			cols.push(col);
		});

		var rowAttrs = {};
		var attrs = Array.prototype.slice.call(rowElement.attributes);
		attrs.forEach(function (a) {
			return rowAttrs[a.name] = a.value;
		});

		return { columns: cols, rowAttrs: rowAttrs };
	}
	return {
		setters: [function (_aureliaFramework) {
			bindable = _aureliaFramework.bindable;
			inject = _aureliaFramework.inject;
			BindingEngine = _aureliaFramework.BindingEngine;
			customElement = _aureliaFramework.customElement;
			processContent = _aureliaFramework.processContent;
			TargetInstruction = _aureliaFramework.TargetInstruction;
			ViewCompiler = _aureliaFramework.ViewCompiler;
			ViewSlot = _aureliaFramework.ViewSlot;
			ViewResources = _aureliaFramework.ViewResources;
			Container = _aureliaFramework.Container;
		}, function (_gridColumn) {
			GridColumn = _gridColumn.GridColumn;
		}],
		execute: function () {
			Grid = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(Grid, [{
					key: 'gridHeight',
					decorators: [bindable],
					initializer: function initializer() {
						return 0;
					},
					enumerable: true
				}, {
					key: 'initialLoad',
					decorators: [bindable],
					initializer: function initializer() {
						return false;
					},
					enumerable: true
				}, {
					key: 'showColumnFilters',
					decorators: [bindable],
					initializer: function initializer() {
						return false;
					},
					enumerable: true
				}, {
					key: 'serverFiltering',
					decorators: [bindable],
					initializer: function initializer() {
						return false;
					},
					enumerable: true
				}, {
					key: 'filterDebounce',
					decorators: [bindable],
					initializer: function initializer() {
						return 500;
					},
					enumerable: true
				}, {
					key: 'serverPaging',
					decorators: [bindable],
					initializer: function initializer() {
						return false;
					},
					enumerable: true
				}, {
					key: 'pageable',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}, {
					key: 'pageSize',
					decorators: [bindable],
					initializer: function initializer() {
						return 10;
					},
					enumerable: true
				}, {
					key: 'page',
					decorators: [bindable],
					initializer: function initializer() {
						return 1;
					},
					enumerable: true
				}, {
					key: 'pagerSize',
					decorators: [bindable],
					initializer: function initializer() {
						return 10;
					},
					enumerable: true
				}, {
					key: 'showPageSizeBox',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}, {
					key: 'showPagingSummary',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}, {
					key: 'showFirstLastButtons',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}, {
					key: 'showJumpButtons',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}, {
					key: 'pageSizes',
					decorators: [bindable],
					initializer: function initializer() {
						return [10, 25, 50];
					},
					enumerable: true
				}, {
					key: 'serverSorting',
					decorators: [bindable],
					initializer: function initializer() {
						return false;
					},
					enumerable: true
				}, {
					key: 'sortable',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}, {
					key: 'autoGenerateColumns',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}, {
					key: 'showColumnHeaders',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}, {
					key: 'selectable',
					decorators: [bindable],
					initializer: function initializer() {
						return false;
					},
					enumerable: true
				}, {
					key: 'selectedItem',
					decorators: [bindable],
					initializer: function initializer() {
						return null;
					},
					enumerable: true
				}, {
					key: 'noRowsMessage',
					decorators: [bindable],
					initializer: function initializer() {
						return "";
					},
					enumerable: true
				}, {
					key: 'autoLoad',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}, {
					key: 'loadingMessage',
					decorators: [bindable],
					initializer: function initializer() {
						return "Loading...";
					},
					enumerable: true
				}, {
					key: 'read',
					decorators: [bindable],
					initializer: function initializer() {
						return null;
					},
					enumerable: true
				}, {
					key: 'onReadError',
					decorators: [bindable],
					initializer: function initializer() {
						return null;
					},
					enumerable: true
				}], null, _instanceInitializers);

				function Grid(element, vc, vr, container, targetInstruction, bindingEngine) {
					_classCallCheck(this, _Grid);

					_defineDecoratedPropertyDescriptor(this, 'gridHeight', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'initialLoad', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'showColumnFilters', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'serverFiltering', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'filterDebounce', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'serverPaging', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'pageable', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'pageSize', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'page', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'pagerSize', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'showPageSizeBox', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'showPagingSummary', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'showFirstLastButtons', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'showJumpButtons', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'pageSizes', _instanceInitializers);

					this.firstVisibleItem = 0;
					this.lastVisibleItem = 0;
					this.pageNumber = 1;

					_defineDecoratedPropertyDescriptor(this, 'serverSorting', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'sortable', _instanceInitializers);

					this.sortProcessingOrder = [];
					this.sorting = {};
					this.Trogdor = true;

					_defineDecoratedPropertyDescriptor(this, 'autoGenerateColumns', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'showColumnHeaders', _instanceInitializers);

					this.columnHeaders = [];
					this.columns = [];

					_defineDecoratedPropertyDescriptor(this, 'selectable', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'selectedItem', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'noRowsMessage', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'autoLoad', _instanceInitializers);

					this.loading = false;

					_defineDecoratedPropertyDescriptor(this, 'loadingMessage', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'read', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'onReadError', _instanceInitializers);

					this.cache = [];
					this.data = [];
					this.count = 0;
					this.unbinding = false;
					this.scrollBarWidth = 16;

					this.element = element;
					this.viewCompiler = vc;
					this.viewResources = vr;
					this.container = container;
					this.bindingEngine = bindingEngine;

					var behavior = targetInstruction.behaviorInstructions[0];
					this.columns = behavior.gridColumns;
					this.rowAttrs = behavior.rowAttrs;
				}

				_createDecoratedClass(Grid, [{
					key: 'attached',
					value: function attached() {
						this.gridHeightChanged();

						if (this.autoLoad) this.refresh();
					}
				}, {
					key: 'bind',
					value: function bind(executionContext) {
						this.resizeListener = window.addEventListener('resize', this.syncColumnHeadersWithColumns.bind(this));

						this["$parent"] = executionContext;

						if (this.serverPaging && !this.serverSorting) this.sortable = false;

						var tbody = this.element.querySelector("table>tbody");
						this.viewSlot = new ViewSlot(tbody, true, this);

						var row = tbody.querySelector("tr");

						this.addRowAttributes(row);

						this.rowTemplate = document.createDocumentFragment();
						this.rowTemplate.appendChild(row);

						this.buildTemplates();
					}
				}, {
					key: 'addRowAttributes',
					value: function addRowAttributes(row) {
						row.setAttribute("repeat.for", "$item of data");
						row.setAttribute("class", "${ $item === $parent.selectedItem ? 'info' : '' }");

						for (var prop in this.rowAttrs) {
							if (this.rowAttrs.hasOwnProperty(prop)) {
								row.setAttribute(prop, this.rowAttrs[prop]);
							}
						}
					}
				}, {
					key: 'buildTemplates',
					value: function buildTemplates() {
						var _this = this;

						var rowTemplate = this.rowTemplate.cloneNode(true);
						var row = rowTemplate.querySelector("tr");

						this.columns.forEach(function (c) {
							var td = document.createElement("td");

							for (var prop in c) {
								if (c.hasOwnProperty(prop)) {

									if (prop == "template") td.innerHTML = c[prop];else td.setAttribute(prop, c[prop]);
								}
							}

							row.appendChild(td);
						});

						var view = this.viewCompiler.compile(rowTemplate, this.viewResources).create(this.container);

						view.bind(this);

						var removeResponse = this.viewSlot.removeAll();

						if (removeResponse instanceof Promise) {
							removeResponse.then(function () {
								return _this.viewSlot.add(view);
							});
						}

						this.viewSlot.add(view);

						this.viewSlot.attached();

						this.noRowsMessageChanged();
					}
				}, {
					key: 'unbind',
					value: function unbind() {
						this.unbinding = true;
						window.removeEventListener('resize', this.resizeListener);
						this.dontWatchForChanges();
					}
				}, {
					key: 'addColumn',
					value: function addColumn(col) {
						if (!this.sortable) col.nosort = true;

						this.columns.push(col);
					}
				}, {
					key: 'pageChanged',
					value: function pageChanged(page, oldValue) {

						if (page === oldValue) return;

						this.pageNumber = Number(page);
						this.refresh();
					}
				}, {
					key: 'pageSizeChanged',
					value: function pageSizeChanged(newValue, oldValue) {

						if (newValue === oldValue) return;

						this.updatePager();
					}
				}, {
					key: 'filterSortPage',
					value: function filterSortPage(data) {
						var tempData = data;

						if (this.showColumnFilters && !this.serverFiltering) tempData = this.applyFilter(tempData);

						this.count = tempData.length;

						if (this.sortable && !this.serverSorting) tempData = this.applySort(tempData);

						if (this.pageable && !this.serverPaging) tempData = this.applyPage(tempData);

						this.data = tempData;

						this.updatePager();

						this.watchForChanges();

						setTimeout(this.syncColumnHeadersWithColumns.bind(this), 0);
					}
				}, {
					key: 'applyPage',
					value: function applyPage(data) {
						var start = (Number(this.pageNumber) - 1) * Number(this.pageSize);
						data = data.slice(start, start + Number(this.pageSize));

						return data;
					}
				}, {
					key: 'updatePager',
					value: function updatePager() {
						if (this.pager) this.pager.update(this.pageNumber, Number(this.pageSize), Number(this.count));

						this.firstVisibleItem = (this.pageNumber - 1) * Number(this.pageSize) + 1;
						this.lastVisibleItem = Math.min(this.pageNumber * Number(this.pageSize), this.count);
					}
				}, {
					key: 'fieldSorter',
					value: function fieldSorter(fields) {
						return function (a, b) {
							return fields.map(function (o) {
								var dir = 1;
								if (o[0] === '-') {
									dir = -1;
									o = o.substring(1);
								}
								if (a[o] > b[o]) return dir;
								if (a[o] < b[o]) return -dir;
								return 0;
							}).reduce(function firstNonZeroValue(p, n) {
								return p ? p : n;
							}, 0);
						};
					}
				}, {
					key: 'pageSizesChanged',
					value: function pageSizesChanged() {
						this.refresh();
					}
				}, {
					key: 'sortChanged',
					value: function sortChanged(field) {
						var newSort = undefined;

						switch (this.sorting[field]) {
							case "asc":
								newSort = "desc";
								break;
							case "desc":
								newSort = "";
								break;
							default:
								newSort = "asc";
								break;
						}

						this.sorting[field] = newSort;

						var pos = this.sortProcessingOrder.indexOf(field);

						if (pos > -1) this.sortProcessingOrder.splice(pos, 1);

						this.sortProcessingOrder.push(field);

						this.refresh();
					}
				}, {
					key: 'applySort',
					value: function applySort(data) {
						var fields = [];

						for (var i = 0; i < this.sortProcessingOrder.length; i++) {
							var sort = this.sortProcessingOrder[i];

							for (var prop in this.sorting) {
								if (sort == prop && this.sorting[prop] !== "") fields.push(this.sorting[prop] === "asc" ? prop : "-" + prop);
							}
						};

						data = data.sort(this.fieldSorter(fields));

						return data;
					}
				}, {
					key: 'applyFilter',
					value: function applyFilter(data) {
						var _this2 = this;

						return data.filter(function (row) {
							var include = true;

							for (var i = _this2.columns.length - 1; i >= 0; i--) {
								var col = _this2.columns[i];

								if (col.filterValue !== "" && row[col.field].toString().indexOf(col.filterValue) === -1) {
									include = false;
								}
							}

							return include;
						});
					}
				}, {
					key: 'getFilterColumns',
					value: function getFilterColumns() {
						var cols = {};

						for (var i = this.columns.length - 1; i >= 0; i--) {
							var col = this.columns[i];

							if (col.filterValue !== "") cols[col.field] = col.filterValue;
						}

						return cols;
					}
				}, {
					key: 'debounce',
					value: function debounce(func, wait) {
						var timeout;

						return function () {

							var context = this,
							    args = arguments;

							var later = function later() {
								timeout = null;
								func.apply(context, args);
							};

							clearTimeout(timeout);
							timeout = setTimeout(later, wait);
						};
					}
				}, {
					key: 'updateFilters',
					value: function updateFilters() {

						if (!this.debouncedUpdateFilters) {
							this.debouncedUpdateFilters = this.debounce(this.refresh.bind(this), this.filterDebounce || 100);
						}

						this.debouncedUpdateFilters();
					}
				}, {
					key: 'refresh',
					value: function refresh() {
						this.dontWatchForChanges();

						if (this.serverPaging || this.serverSorting || this.serverFiltering || !this.initialLoad) this.getData();else this.filterSortPage(this.cache);
					}
				}, {
					key: 'getData',
					value: function getData() {
						var _this3 = this;

						if (!this.read) throw new Error("No read method specified for grid");

						this.initialLoad = true;

						this.loading = true;

						this.read({
							sorting: this.sorting,
							paging: { page: this.pageNumber, size: Number(this.pageSize) },
							filtering: this.getFilterColumns()
						}).then(function (result) {
							_this3.handleResult(result);

							_this3.loading = false;
						}, function (result) {
							if (_this3.onReadError) _this3.onReadError(result);

							_this3.loading = false;
						});
					}
				}, {
					key: 'handleResult',
					value: function handleResult(result) {
						var data = result.data;

						if (this.pageable && !this.serverPaging && !this.serverSorting && !this.serverFiltering) {
							this.cache = result.data;
							this.filterSortPage(this.cache);
						} else {
							this.data = result.data;
							this.filterSortPage(this.data);
						}

						this.count = result.count;

						this.updatePager();
					}
				}, {
					key: 'watchForChanges',
					value: function watchForChanges() {
						var _this4 = this;

						this.dontWatchForChanges();

						if (!this.unbinding) this.subscription = this.bindingEngine.collectionObserver(this.cache).subscribe(function (splices) {
								_this4.refresh();
							});
					}
				}, {
					key: 'dontWatchForChanges',
					value: function dontWatchForChanges() {
						if (this.subscription) this.subscription.dispose();
					}
				}, {
					key: 'select',
					value: function select(item) {
						if (this.selectable) this.selectedItem = item;

						return true;
					}
				}, {
					key: 'noRowsMessageChanged',
					value: function noRowsMessageChanged() {
						this.showNoRowsMessage = this.noRowsMessage !== "";
					}
				}, {
					key: 'gridHeightChanged',
					value: function gridHeightChanged() {
						var cont = this.element.querySelector(".grid-content-container");

						if (this.gridHeight > 0) {
							cont.setAttribute("style", "height:" + this.gridHeight + "px");
						} else {
							cont.removeAttribute("style");
						}
					}
				}, {
					key: 'syncColumnHeadersWithColumns',
					value: function syncColumnHeadersWithColumns() {
						var headers = this.element.querySelectorAll("table>thead>tr:first-child>th");
						var filters = this.element.querySelectorAll("table>thead>tr:last-child>th");

						var cells = this.element.querySelectorAll("table>tbody>tr:first-child>td");

						for (var i = headers.length - 1; i >= 0; i--) {
							var header = headers[i];
							var filter = filters[i];
							var cell = cells[i];

							if (cell && header && filter) {
								var overflow = this.isBodyOverflowing();
								var tgtWidth = cell.offsetWidth + (i == headers.length - 1 && overflow ? this.scrollBarWidth : 0);

								header.setAttribute("style", "width: " + tgtWidth + "px");
								filter.setAttribute("style", "width: " + tgtWidth + "px");
							}
						};
					}
				}, {
					key: 'isBodyOverflowing',
					value: function isBodyOverflowing() {
						var body = this.element.querySelector(".grid-content-container");
						return body.offsetHeight < body.scrollHeight || body.offsetWidth < body.scrollWidth;
					}
				}], null, _instanceInitializers);

				var _Grid = Grid;
				Grid = inject(Element, ViewCompiler, ViewResources, Container, TargetInstruction, BindingEngine)(Grid) || Grid;
				Grid = processContent(function (viewCompiler, viewResources, element, instruction) {
					var result = processUserTemplate(element);
					instruction.gridColumns = result.columns;
					instruction.rowAttrs = result.rowAttrs;

					return true;
				})(Grid) || Grid;
				Grid = customElement('grid')(Grid) || Grid;
				return Grid;
			})();

			_export('Grid', Grid);
		}
	};
});