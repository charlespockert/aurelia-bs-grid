export class GridColumn {
	
	constructor(config, template) {
		this.template = template;
		this.field = config.field;

		if(!this.field)
			throw new Error("field is required");

		this.heading = config.heading || config.field;
		this.nosort = config.nosort || false;
	}

}