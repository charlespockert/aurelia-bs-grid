# aurelia-bs-grid

An Aurelia based data-grid control

Demo here:
http://charlespockert.github.io/aurelia-grid/

## Using the grid

Import the plugin using standard plugin import syntax:

```javascript
aurelia.use.plugin("path-to/grid", config => {
});
```

Then use by placing a `<grid>` custom element in your view:

```html
<template>
  <!-- Grid... -->
  <grid read.call="getSomeData($event)">
    <!-- Row template -->
    <grid-row replace-part="columns">
      <!-- Column template(s) -->
      <grid-col heading="ID" field="id" class="col-md-6">${ $item.id }</grid-col>
      <grid-col heading="Name" field="name" class="col-md-6">${ $item.name }</grid-col>
    </grid-row>
  </grid>
</template>
```

You can specify the columns and their templates in-line in the markup. This gives you a view-friendly way of defining a data-grid so you can safely re-use your viewmodels.

As you can see in the above example you need to provide a template which provides both a `<grid-row>` element and one or more `<grid-col>` elements. These will form your row/column templates 

##Column templates

The template should be a list of `<grid-col>` elements, each of which represents a column. Each `<grid-col>` should specify the following required attribute(s):

**Required attributes**
- field="someFieldName"

The name of the data field that backs this column

**Optional attributes**

The column definition can also specify one or more optional attributes:

- heading="Field Name"

The column header. If not specified the value of `field` will be used

- nosort

Don't allow sorting on this column (overrides the grid sort setting)

Any markup contained within the `<grid-col>` will become the column template. This markup will be evaluated in the scope of the grid repeater and references the current row using an `$item` property

This allows you to work with and template any value on the current data row:

```
<grid-col heading="ID" field="id" class="col-md-6">Hello world I am item ${ $item.id }</grid-col>
```

Additionally, since this markup is used directly in the rendered output you can add classes, expressions etc - anything that works in Aurelia should work on the column template

**Note:**

To reference the owning viewmodel of the grid custom-element use `$parent.$parent`. Hopefully this won't be neccessary in later versions of Aurelia

#Grid methods and properties

## Bindable properties

The grid has several bindables which allow you to configure its behaviour:

- read.call="[dataFetchMethod($event)]"
  - This should be a method which returns a promise that resolves to a grid result object. The object should provide the grid with data and a total count of rows. 

```javascript
loadData(gridArgs)
{
  return new Promise((resolve, reject) => resolve({
      data: ...your data...,
      count: ...total number of data rows (without filters)...
    });
  }
}
```

The `$event` parameter is used for paging and sorting (details below)

- on-read-error.call="[someFunction($event)]"
  - Called when the promise in the read method is rejected. Receives the result of the rejection into the `$event` parameter 

- pageable="[true/false]"
  - Enable/disable pagination for this grid

- server-paging="[false/true]"
  - Turns on/off server paging. When this is turned on, paging should be handled by the server - the grid will pass an object to your read method that looks like this: 

```javascript
{
  paging: { size: [page size], page: [page_no] }
  sorting: { [column] :[sortdirection] }
}
```

You can then process this and pass the appropriate paging and sorting information to the server

- page-size="[numeric]"
  - The number of records to show on each page

- page="[numeric]"
  - The grid's current page number

- sortable="[true/false]"
  - Enable/disable sorting for this grid

- server-sorting="[true/false]"
  - Same as above but for sorting

- auto-generate-columns="[true/false]"
  - Should columns be automatically generated from the data source (requires some data to be read as the grid will look at the first row in the data set)

- selectable="[true/false]"
  - Enable selectable rows

- selected-item="[current-data-row]"
  - Represents the currently selected item in the grid

- no-rows-message="[a message]"
  - Message to show when there is no data in the grid. Won't show if value is "falsey"
  
- auto-load="[true/false]"
  - Auto-refreshes the data source when the grid is attached to the DOM

- loading-message="[message]"
  - Message to show when the grid is in the middle of loading