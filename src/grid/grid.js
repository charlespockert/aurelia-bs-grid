import {bindable, inject, skipContentProcessing, ObserverLocator, customElement } from 'aurelia-framework';
import {GridColumn} from './grid-column';
import {Compiler} from 'gooy/aurelia-compiler';
import './aurelia-bs-grid.css!';

@customElement('grid')
@skipContentProcessing()
@inject(Element, Compiler, ObserverLocator)
export class Grid {

	/* == Styling == */
	@bindable gridHeight = 0;

	/* == Options == */

	// Initial load flag (for client side)
	@bindable initialLoad = false;

	// Filtering
	@bindable showColumnFilters = false;
	@bindable serverFiltering = false;

	// Pagination
	@bindable serverPaging = false;
	@bindable pageable = true;
	@bindable pageSize = 10;
	@bindable page = 1;
	@bindable pagerSize = 10;
	
	@bindable showFirstLastButtons = true;
	@bindable showJumpButtons = true;

	@bindable pageSizes = [10, 25, 50];

	firstVisibleItem = 0;
	lastVisibleItem = 0;

	pageNumber = 1;

	
	// Sortination
	@bindable serverSorting = false;
	@bindable sortable = true;
	sortProcessingOrder = []; // Represents which order to apply sorts to each column
	sorting = {};

	// Burnination?
	Trogdor = true;

	// Column defs
	@bindable autoGenerateColumns;	
	columnHeaders = [];
	columns = [];
	
	// Selection
	@bindable selectable = false;
	@bindable selectedItem = null;

	// Misc
	@bindable noRowsMessage = "";

	// Data ....
	@bindable autoLoad = true;
	loading = false;
	@bindable loadingMessage = "Loading...";

	// Read
	@bindable read = null;
	@bindable onReadError = null;

	// Tracking
	cache = [];
	data = [];
	count = 0;

	// Subscription handling
	unbinding = false;

	constructor(element, compiler, observerLocator) {
		this.element = element;
		this.compiler = compiler;
		this.observerLocator = observerLocator;

		// Grab user template from element
		this.processUserTemplate();
	}

	processUserTemplate() {

		// Get any col tags from the content
		var rowElement = this.element.querySelector("grid-row");
		var columnElements = Array.prototype.slice.call(rowElement.querySelectorAll("grid-col"));
	
		columnElements.forEach(c => {

			var attrs = Array.prototype.slice.call(c.attributes), colHash = {};
			attrs.forEach(a => colHash[a.name] = a.value);

			var col = new GridColumn(colHash, c.innerHTML);

			this.addColumn(col);
		});

		// Pull any row attrs into a hash object
		this.rowAttrs = {};
		var attrs = Array.prototype.slice.call(rowElement.attributes);
		attrs.forEach(a => this.rowAttrs[a.name] = a.value);

		// Remove all children
		while(this.element.childNodes.length > 0)
			this.element.removeChild(this.element.childNodes[0]);
	}

	/* === Lifecycle === */
	attached() {
		this.gridHeightChanged();

		if(this.autoLoad)
		    this.refresh();
	}

	bind(executionContext) {

		this["$parent"] = executionContext;

		// Ensure the grid settings
		// If we can page on the server and we can't server sort, we can't sort locally
		if(this.serverPaging && !this.serverSorting)
			this.sortable = false;

		// Build the rows then dynamically compile the table
		// Get the table...
		var table = this.element.querySelector("table>tbody");
		var rowTemplate = table.querySelector("tr");

		// Create a fragment we will manipulate the DOM in
		var fragment = document.createDocumentFragment();

		// Move the row template to the fragment
		fragment.appendChild(rowTemplate);

		// Create the repeater
		rowTemplate.setAttribute("repeat.for", "$item of data");
		rowTemplate.setAttribute("class", "${ $item === $parent.selectedItem ? 'info' : '' }");
		
		// Copy any user specified row attributes to the row template
		for (var prop in this.rowAttrs) {
    		if (this.rowAttrs.hasOwnProperty(prop)) {
				rowTemplate.setAttribute(prop, this.rowTemplate[prop]);
        	}
		}	

		// Create the columns
		this.columns.forEach(c => {
			var td = document.createElement("td");

			// Set attributes
			for (var prop in c) {
	    		if (c.hasOwnProperty(prop)) {

	    			if(prop == "template")
	    				td.innerHTML = c[prop];
	    			else
		    			td.setAttribute(prop, c[prop]);
	        	}
			}	

			rowTemplate.appendChild(td);
		});

		// Compile
		this.compiler.compile(table, this, undefined, fragment);

		// HACK: why is the change handler not firing for noRowsMessage?
		this.noRowsMessageChanged();
	}

	unbind() {
		this.unbinding = true;
		this.dontWatchForChanges();
	}

	/* === Column handling === */
	addColumn(col) {

		// No-sort if grid is not sortable
		if(!this.sortable)
			col.nosort = true;

		this.columns.push(col);
	}

	/* === Paging === */
	pageChanged(page) {
		this.pageNumber = Number(page);
		this.refresh();
	}

	pageSizeChanged() {
		this.pageChanged(1);
		this.updatePager();
	}

	filterSortPage(data) {
		// Applies filter, sort then page
		// 1. First filter the data down to the set we want, if we are using local data
		var tempData = data;

		if(this.showColumnFilters && !this.serverFiltering)
			tempData = this.applyFilter(tempData);

		// Count the data now before the sort/page
		this.count = tempData.length;

		// 2. Now sort the data
		if(this.sortable && !this.serverSorting)
			tempData = this.applySort(tempData);

		// 3. Now apply paging
		if(this.pageable && !this.serverPaging)
			tempData = this.applyPage(tempData);

		this.data = tempData;

		this.updatePager();

		this.watchForChanges();
	}

	applyPage(data) {
		var start = (Number(this.pageNumber) - 1) * Number(this.pageSize);
		data = data.slice(start, start + Number(this.pageSize));

		return data;
	}


	updatePager() {
		if(this.pager)
			this.pager.update(this.pageNumber, Number(this.pageSize), Number(this.count));

		this.firstVisibleItem = (this.pageNumber - 1) * Number(this.pageSize) + 1;
		this.lastVisibleItem = (this.pageNumber) * Number(this.pageSize);
	}

	/* === Sorting === */
	fieldSorter(fields) {
	    return function (a, b) {
	        return fields
	            .map(function (o) {
	                var dir = 1;
	                if (o[0] === '-') {
	                   dir = -1;
	                   o = o.substring(1);
	                }
	                if (a[o] > b[o]) return dir;
	                if (a[o] < b[o]) return -(dir);
	                return 0;
	            })
	            .reduce(function firstNonZeroValue (p,n) {
	                return p ? p : n;
	            }, 0);
	    };
	}

	pageSizesChanged() {
		this.refresh();
	}

	sortChanged(field) {

		// Determine new sort
		var newSort = undefined;

		// Figure out which way this field should be sorting
	    switch(this.sorting[field]) {
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

	    // If the sort is present in the sort stack, slice it to the back of the stack, otherwise just add it
	    var pos = this.sortProcessingOrder.indexOf(field);

	    if(pos > -1)
	    	this.sortProcessingOrder.splice(pos, 1);	    

		this.sortProcessingOrder.push(field); 

	    // Apply the new sort
		this.refresh();
	}

	applySort(data) {

		// Format the sort fields
		var fields = [];

		// Get the fields in the "sortingORder"
		for (var i = 0; i < this.sortProcessingOrder.length; i++) {
			var sort = this.sortProcessingOrder[i];

			for(var prop in this.sorting) {
				if(sort == prop && this.sorting[prop] !== "")
					fields.push(this.sorting[prop] === "asc" ? (prop) : ("-" + prop));
			}
		};


		// If server sort, just refresh
		data = data.sort(this.fieldSorter(fields));

		return data;
	}

	/* === Filtering === */
	applyFilter(data) {
		return data.filter((row) => {
			var include = true;

			for (var i = this.columns.length - 1; i >= 0; i--) {
				var col = this.columns[i];

				if(col.filterValue !== "" && row[col.field].toString().indexOf(col.filterValue) === -1) {
					include = false;
				}
			}

			return include;
		});
	}

	getFilterColumns() {
		var cols = [];

		for (var i = this.columns.length - 1; i >= 0; i--) {
			var col = this.columns[i];

			if(col.filterValue !== "") {
				cols.push({ field: col.field, value: col.filterValue });
			}
		}		

		return cols;
	}

	updateFilters() {
		this.refresh();
	}

	/* === Data === */
	refresh() {
		// If we have any server side stuff we need to get the data first
		this.dontWatchForChanges();

		if(this.serverPaging || this.serverSorting || this.serverFiltering || !this.initialLoad)
			this.getData();
		else
			this.filterSortPage(this.cache);

	}

	getData() {
		if(!this.read)
			throw new Error("No read method specified for grid");

		this.initialLoad = true;

		// TODO: Implement progress indicator
		this.loading = true;

		// Try to read from the data adapter
		this.read({ 
			sorting: this.sorting, 
			paging: { page: this.pageNumber, size: Number(this.pageSize) },
			filtering: this.getFilterColumns() 
		})
		.then((result) => {

			// Data should be in the result so grab it and assign it to the data property
			this.handleResult(result);

			this.loading = false;
		}, (result) => {
			// Something went terribly wrong, notify the consumer
			if(this.onReadError)
				this.onReadError(result);

			this.loading = false;
		});
	}

	handleResult(result) {

		// TODO: Check valid stuff was returned
		var data = result.data;

		// Is the data being paginated on the client side?
		// TODO: Work out when we should we use the cache... ever? If it's local data
		if(this.pageable && !this.serverPaging && !this.serverSorting && !this.serverFiltering) {
			// Cache the data
			this.cache = result.data;
			this.filterSortPage(this.cache);
		} else {
			this.data = result.data;
			this.filterSortPage(this.data);
		}
	
	    this.count = result.count;

	    // Update the pager - maybe the grid options should contain an update callback instead of reffing the
	    // pager into the current VM?
	    this.updatePager();
	}

	watchForChanges() {

		this.dontWatchForChanges();

		// Guard against data refresh events hitting after the user does anything that unloads the grid
		if(!this.unbinding)
		    // We can update the pager automagically
		    this.subscription = this.observerLocator
		        .getArrayObserver(this.cache)
		        .subscribe((splices) => {			
					this.refresh();
		        });
	}

	dontWatchForChanges() {
		if(this.subscription)
			this.subscription();
	}

	/* === Selection === */

	select(item) {
		if(this.selectable)
			this.selectedItem = item;
	}

	/* === Change handlers === */
	noRowsMessageChanged() {
		this.showNoRowsMessage = this.noRowsMessage !== "";
	}

	gridHeightChanged() {

		var cont = this.element.querySelector(".grid-content-container");
		
		if(this.gridHeight > 0) {
			cont.setAttribute("style", "height:" + this.gridHeight + "px");
		} else {
			cont.removeAttribute("style");
		}
	}

}

