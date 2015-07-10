# aurelia-bs-grid

A lightweight Aurelia native data-grid control (no jQuery, no unnecessary dependencies)

Demo here:
http://charlespockert.github.io/aurelia-bs-grid-demo/

## Using the grid

1. Install the plugin into your project using jspm
  
  ```
  jspm install github:charlespockert/aurelia-bs-grid
  ```
2. In order to import the plugin you need to be [manually bootstrapping Aurelia](http://aurelia.io/docs#startup-and-configuration).

  Open your `index.html` or equivalent and find your `aurelia-app` attribute and change it to:

  ```html
    <body aurelia-app="main">
  ```
3. Create a `main.js` file in your src directory and import the plugin using the `aurelia` configuration object 

  ```javascript
  export function configure(aurelia) {
    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      // Install the plugin
      .plugin('charlespockert/aurelia-bs-grid');
    aurelia.start().then(a => a.setRoot());
  }
  ```
4. Since the plugin is globalized, you can use it by placing a `<grid>` custom element in any of your views:

  ```html
    <grid read.call="getSomeData($event)">
      <!-- Row template -->
      <grid-row>
        <!-- Column template(s) -->
        <grid-col heading="ID" field="id" class="col-md-6">${ $item.id }</grid-col>
        <grid-col heading="Name" field="name" class="col-md-6">${ $item.name }</grid-col>
      </grid-row>
    </grid>
  ```

  You can specify the columns and their templates in-line in the markup. This gives you a view-friendly way of defining a data-grid so you can safely re-use your viewmodels.

##The grid template

The comments below show the functional parts of the grid

  ```html
  <!-- Grid plugin element -->
  <grid>
    <!-- Row template -->
    <grid-row>
      <!-- Columns -->
      <grid-col><!-- Column template --></grid-col>
      <grid-col><!-- Column template --></grid-col>
    </grid-row>
  </grid>
  ```

You should provide a `<grid-row>` element and one or more child `<grid-col>` elements. 

# &lt;grid-row&gt;
This represents a row of bound data. Any attributes applied to this element will be forwarded to the rows generated in the grid, so you can style your rows by applying classes to this element:

```html
<grid-row class="row-style">...
```

# &lt;grid-col&gt;
This represents a column in your grid - the same rules apply to grid columns in that any attributes will be forwarded to each grid cell that's generated.

There is one special attribute which is **required** on a `<grid-col>` element

**field**

The field attribute specifies which property the column should represent for sorting and tracking purposes

`<grid-col field="someProperty">`

If you don't specify this attribute the grid will throw an error

## Column Templates 

Anything between the column tags will be the column template. You can place any HTML markup in here and it will be picked up and compiled by Aurelia, so you can interpolate, attach event handlers, bind to expressions etc etc.

You can reference the current data row in the template by using the special `$item` field

```
<grid-col>This is a template, the current data item is ${ $item }</grid-col>
```

**Note:**

Each row will be in the scope of the `repeat` element, so in order to get back to your consuming viewmodel you need to jump up two levels (up to the `grid` scope then up to your viewmodel scope)

You can use `$parent` to reference the grid scope and `$parent.$parent` to get back to your viewmodel. Hopefully this won't be neccessary in later versions of Aurelia.

## Optional &lt;grid-col&gt; attributes

The column definition can also specify one or more optional attributes:

**heading="A column heading..."**

The column header. If not specified the value of `field` will be used

**nosort**

Don't allow sorting on this column (overrides the grid sort setting)

#Grid methods and properties

## Bindable properties

The grid has several bindables which allow you to configure its behaviour:

**read.call="yourDataFetchMethod($event)"**

This should be a method which returns a promise that resolves to a grid result object. The object should provide the grid with data and a total count of rows. 

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

The `$event` parameter is used for paging and sorting (see "server-paging" below)

**on-read-error.call="someFunction($event)"**

Called when the promise in the read method is rejected. Receives the result of the rejection into the `$event` parameter 

**pageable="true/false"**

Enable/disable pagination for this grid

**server-paging="false/true"**

Turns on/off server paging. When this is turned on, paging should be handled by the server - the grid will pass an object to your read method that has the paging and sorting parameters for the grid

It looks like this: 

```javascript
{
  paging: { size: [page size], page: [page_no] }
  sorting: { [column] :[sortdirection] }
}
```

You can then process this and pass the appropriate paging and sorting information to the server

**page-size="10"**

The number of records to show on each page

**page="1"**

The grid's current page number

**sortable="true/false"**

Enable/disable sorting for this grid

**server-sorting="true/false"**

Same as above but for sorting

**auto-generate-columns="true/false"**

Should columns be automatically generated from the data source (requires some data to be read as the grid will look at the first row in the data set)

**selectable="true/false"**

Enable selectable rows

**selected-item.bind="xyz"**

Represents the currently selected item in the grid

**no-rows-message="Sorry, no rows here!"**

Message to show when there is no data in the grid. Won't show if value is "falsey"
  
**auto-load="true/false"**

Auto-refreshes the data source when the grid is attached to the DOM

**loading-message="Please wait... loading"**

A message to show when the grid is in the middle of loading

## Methods

**refresh()**

Causes the grid to call it's `read` method again. Useful when you have changed some criteria (a quick filter box for example) and you want the grid to re-query the server data.
