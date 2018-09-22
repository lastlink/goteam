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
var leftStateData={};

$( "#leftMap" ).click(function() {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://gameral.com/api/api.php/t_state/1",
		"method": "GET",
		"headers": {}
	  }
	  
	  $.ajax(settings).done(function (response) {
		  console.log("response")
		// console.log(response);

		var  leftStateData=JSON.parse(response);
		leftStateData.issues=[]
		// console.log("issues")

		// console.log(leftStateData.issues);

		var issueSize = 6;

		for (let i = 1; i <= issueSize; i++) {
			var issue={
				label:leftStateData["issue"+i],
				value:leftStateData["value"+i],
				toplic:leftStateData["topic"+i]
			}
			leftStateData.issues.push(issue)

		}
		
		// response.issues.
		console.log("leftStateData:")

		console.log(leftStateData);

		$( "#leftPopup" ).toggle();
	  });
	// alert( "Handler for leftMap .click() called." );
	// console.log("leftMap")

  });

  $( "#rightMap" ).click(function() {
	alert( "Handler for rightMap .click() called." );
	console.log("rightMap")

  });
})