$(document).ready(function () {
	// $('#ex1').slider({
	// 	formatter: function(value) {
	// 		return 'Current value: ' + value;
	// 	}
	// });

	// Without JQuery
	// var slider = new Slider('#ex1', {
	// 	formatter: function(value) {
	// 		return 'Current value: ' + value;
	// 	}
	// });
	console.log("test")
	var leftStateData = {};
	function updateProposal(id) {

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "http://gameral.com/api/api.php/t_state/" + id,
			"method": "GET",
			"headers": {}
		}

		$.ajax(settings).done(function (response) {
			console.log("response")
			// console.log(response);

			var leftStateData = JSON.parse(response);
			leftStateData.issues = []
			$("#story").text(leftStateData.story)
			// console.log("issues")

			// console.log(leftStateData.issues);

			var issueSize = 6;

			for (let i = 1; i <= issueSize; i++) {
				var issue = {
					label: leftStateData["issue" + i],
					value: leftStateData["value" + i],
					topic: leftStateData["topic" + i]
				}
				leftStateData.issues.push(issue)

			}

			// response.issues.
			console.log("leftStateData:")

			console.log(leftStateData);
			// add inputs
			// 	<!-- 
			var proposalHtml = "<h1>Proposal:</h1>"
			var popupIsues=""
			for (let i = 0; i < leftStateData.issues.length; i++) {
				const element = leftStateData.issues[i];

				proposalHtml += `
			<h3>`+ element.label + `:</h3>
     <br> 
	  <input id="issue`+ i + 1 + `" width:'100%' data-slider-id='issue` + i + 1 + `Slider' type="text" data-slider-min="0" data-slider-max="` + element.value * 2 + `" data-slider-step="1" data-slider-value="` + element.value + `"/>
	  <br> 
			`

			popupIsues+=``+element.label+`<br>Value:`+element.value+`<br>`


			}


			$("#proposal")
				.html(proposalHtml);
				$('#popupIssues')
				    .html(popupIsues)

			for (let i = 0; i < leftStateData.issues.length; i++) {
				var slider = new Slider('#issue' + i + 1, {
					formatter: function (value) {
						return 'Current value: ' + value;
					}
				});
			}
		})
	}

	updateProposal(1);

	$("#leftMap").click(function () {
		updateProposal(1)


		$("#leftPopup").toggle();
	});
	// alert( "Handler for leftMap .click() called." );
	// console.log("leftMap")

	// });

	$("#rightMap").click(function () {
		alert("Handler for rightMap .click() called.");
		console.log("rightMap")

	});
})