export class GridColumn {
	
	specialColumns = ["heading", "nosort"];

	constructor(config, template) {
		this.template = template;
		this.field = config.field;

		if(!this.field)
			throw new Error("field is required");

		this.heading = config.heading || config.field;
		this.nosort = config.nosort || false;
		this.filterValue = "";
		this.showFilter = config["show-filter"] === "false" ? false : true;

		// Set attributes
		for (var prop in config) {
    		if (config.hasOwnProperty(prop) && this.specialColumns.indexOf(prop) < 0) {
    			this[prop] = config[prop];
        	}
		}		
	}

}