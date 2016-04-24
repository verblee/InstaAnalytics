
var bloodhound = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
  url: '/fred?query=%QUERY',
  wildcard: '%QUERY'
}

});

bloodhound.initialize();
// Instantiate the Typeahead UI
$('#scrollable-dropdown-menu .typeahead').typeahead(null, {
    // Use 'value' as the displayKey because the filter function 
    // returns suggestions in a javascript object with a variable called 'value'
    source : bloodhound.ttAdapter(),
    highlight: true,
    autoSelect : true,
    limit: 50
});

var data = [[]];

var container = document.getElementById('data_table');
var hot = new Handsontable(container, {
  data: data,
  minRows: 40,
  minCols:20,
  colWidths: 80,
  rowHeaders: true,
  colHeaders: true,
  dropdownMenu: true
});