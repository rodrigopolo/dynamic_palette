// Array with data
var items=[
	{label: 'Label  1', value:  -10},
	{label: 'Label  2', value:  -20},
	{label: 'Label  3', value:  -30},
	{label: 'Label  4', value:  -40},
	{label: 'Label  5', value:  -50},
	{label: 'Label  6', value:  -60},
	{label: 'Label  7', value:  -70},
	{label: 'Label  8', value:  -80},
	{label: 'Label  9', value:  -90},
	{label: 'Label 10', value: -100}
];


// var items=[
// 	{label: 'Label  1', value:  10},
// 	{label: 'Label  2', value:  20},
// 	{label: 'Label  3', value:  30},
// 	{label: 'Label  4', value:  40},
// 	{label: 'Label  5', value:  50},
// 	{label: 'Label  6', value:  60},
// 	{label: 'Label  7', value:  70},
// 	{label: 'Label  8', value:  80},
// 	{label: 'Label  9', value:  90},
// 	{label: 'Label 10', value: 100}
// ];


// Populate normalized data and colors
dpallete({
	data: items,
	palette: ['#63be7b','#ffeb84','#f8696b'],
	value_src: 'value',
	value_dst: 'norm',
	color_prp: 'color'
});

// Draw items on the DOM
items.forEach(function(v, index){
	$('body').append('<div class="bx" id="b_'+index+'"></div>');
	$('#b_'+index).css('background',v.color);
});