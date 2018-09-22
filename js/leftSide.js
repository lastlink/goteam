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

	var indexComparison = {

	};
	function propose() {
		console.log("eat my candy")
	}
	$("#propose").click(function () {
		// alert( "Handler for .click() called." );
		// $('#exampleModal').toggle()
		console.log("computing game")
		// reset comparison
		indexComparison = {
			trade: 0,
			justice: 0,
			intellectual_property: 0,
			enviroment: 0,
			unknown: 0
		}
		var propResults=""
		for (let i = 0; i < leftStateData.issues.length; i++) {
			const element = leftStateData.issues[i];
			// var selectedPer= $("#issue"+i+1).value
			console.log(element)
			propResults+=element.label+":"+element.value*(element.per/100)+"<br>"
			// label: leftStateData["issue" + i],
			// value: leftStateData["value" + i],
			// topic: leftStateData["topic" + i]
			// console.log(selectedPer)
			switch (element.topic) {
				case "Trade":
					indexComparison.trade += element.per

					break;
				case "Justice":
					indexComparison.justice += element.per

					break;
				case "IP":
					indexComparison.intellectual_property += element.per

					break;
				case "Enviroment":
					indexComparison.enviroment += element.per

					break;

				default:
					indexComparison.unknown += element.per
					break;
			}

		}
		console.log(indexComparison)
		console.log(rightCountryData)

		var validP = true;
		for (const key in indexComparison) {
			if (indexComparison.hasOwnProperty(key)) {
				console.log(key + ":" + indexComparison[key])

				if (rightCountryData[key] && (indexComparison[key] > (parseInt(rightCountryData[key]) + 10) || indexComparison[key] < (parseInt(rightCountryData[key]) - 10))) {
					validP = false;
					console.log("is false")
					console.log(indexComparison[key] + ":" + rightCountryData[key])
					break;
				}
				// const element = indexComparison[key];

			}
		}
		
		// proposalResults
		// run computation
		if (validP){
			// for (let i = 0; i < leftStateData.issues.length; i++) {
			// 	const element = leftStateData.issues[i];
				
			// }
			$("#proposalResults").html(propResults)
			$("#exampleModal").modal()

		}
		else
			alert("your selection is too far off")

	});
	var rightCountryData = {}
	function retrieveCountry(id) {

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://gameral.com/api/api.php/t_country/" + id,
			"method": "GET",
			"headers": {}
		}

		$.ajax(settings).done(function (response) {
			rightCountryData = JSON.parse(response);
			console.log("country:")

			console.log(rightCountryData);
			var cIssues=""
			cIssues+="<h3>Country:"+rightCountryData.country+"</h3><br>"
			cIssues+="Trade:"+rightCountryData.trade+"<br>"
			cIssues+="IP:"+rightCountryData.intellectual_property+"<br>"
			cIssues+="Justice:"+rightCountryData.justice+"<br>"
			cIssues+="Enviroment:"+rightCountryData.enviroment
			console.log(cIssues)
			$("#popupCIssues")
				.html(cIssues);

		});
	}
	function updateProposal(id) {

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://gameral.com/api/api.php/t_state/" + id,
			"method": "GET",
			"headers": {}
		}

		$.ajax(settings).done(function (response) {
			console.log("response")
			// console.log(response);

			leftStateData = JSON.parse(response);
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
			var popupIsues = ""
			for (let i = 0; i < leftStateData.issues.length; i++) {
				const element = leftStateData.issues[i];

				proposalHtml += `
			<h3>`+ element.label + `:</h3>
     <br> 
	  <input id="issue`+ i + 1 + `" width:'100%' data-slider-id='issue` + i + 1 + `Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="50"/>
	  <br> 
			`

				popupIsues += `` + element.label + `<br>Value:` + element.value + `<br>`


			}


			$("#proposal")
				.html(proposalHtml);
			$('#popupIssues')
				.html(popupIsues)

			for (let i = 0; i < leftStateData.issues.length; i++) {
				var slider = new Slider('#issue' + i + 1, {
					formatter: function (value) {
						leftStateData.issues[i].per = value
						return 'Current value: ' + value;
					}
				});
			}
		})
	}

	$('#stateSelect').on('change', function () {
		// alert( this.value );
		var value = parseInt(this.value) ? this.value : 1
		console.log(value)

		updateProposal(value)

	});

	updateProposal(1);
	retrieveCountry(1);

	$("#leftMap").click(function () {
		// updateProposal(1)
		$.cookie('stateVal', 1, { expires: 7, path: '/',
		 secure: true });

		 console.log("statval:")
	console.log(	 $.cookie('stateVal')); // => 'the_value'

		 


		// $("#leftPopup").toggle();
	});
	// alert( "Handler for leftMap .click() called." );
	// console.log("leftMap")

	// });

	$("#rightMap").click(function () {
		alert("Handler for rightMap .click() called.");
		console.log("rightMap")

	});
})