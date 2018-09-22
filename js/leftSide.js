$( document ).ready(function() {
	$('#ex1').slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});
	
	// Without JQuery
	// var slider = new Slider('#ex1', {
	// 	formatter: function(value) {
	// 		return 'Current value: ' + value;
	// 	}
	// });
console.log("test")

$( "#leftMap" ).click(function() {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://gameral.com/api/api.php/t_state/1",
		"method": "GET",
		"headers": {}
	  }
	  
	  $.ajax(settings).done(function (response) {
		console.log(response);
	  });
	// alert( "Handler for leftMap .click() called." );
	// console.log("leftMap")

  });

  $( "#rightMap" ).click(function() {
	alert( "Handler for rightMap .click() called." );
	console.log("rightMap")

  });
})