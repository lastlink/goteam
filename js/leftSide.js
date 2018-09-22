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
		var propResults = ""
		for (let i = 0; i < leftStateData.issues.length; i++) {
			const element = leftStateData.issues[i];
			// var selectedPer= $("#issue"+i+1).value
			console.log(element)
			propResults += element.label + ":" + Math.round(element.value * (element.per / 100) * 100) / 100 + "<br>"
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
		var badTopic = ""
		for (const key in indexComparison) {
			if (indexComparison.hasOwnProperty(key)) {
				console.log(key + ":" + indexComparison[key])

				if (rightCountryData[key] && (indexComparison[key] > (parseInt(rightCountryData[key]) + 10) || indexComparison[key] < (parseInt(rightCountryData[key]) - 10))) {
					validP = false;
					badTopic = key + " which was " + indexComparison[key] + ". it needs to be within 10 of " + rightCountryData[key];
					console.log("is false")
					console.log(indexComparison[key] + ":" + rightCountryData[key])

					// for (let i = 0; i < leftStateData.issues.length; i++) {
					// 	const element = leftStateData.issues[i];

					// }
					// var test = $("#issue4Slider > .slider-handle")
					// add red class if of bad topic
					// test.addClass( "red" );

					// test.addClass( "red" );
					// 
					break;
				}
				// const element = indexComparison[key];

			}
		}

		// proposalResults
		// run computation
		if (validP) {
			// for (let i = 0; i < leftStateData.issues.length; i++) {
			// 	const element = leftStateData.issues[i];

			// }
			// $("#proposalResults").html(propResults)


			Cookies.set('proposalResults', propResults, { expires: 7 });

			console.log(Cookies.get('proposalResults'));
			// window.location.pathname = "./win.html";
			window.location.href = './win.htm'; //one level up

			// 	 console.log("statval:")
			// console.log(	 Cookies.get('stateVal')); // => 'the_value'

			// $("#exampleModal").modal()

		}
		else
			alert("Your selection is too far off for " + badTopic + ". Please try re-adjusting.")

	});

	function setResults() {
		var results = Cookies.get('proposalResults');
		if (results)
			$("#proposalResults").html(results)
	}
	setResults();
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
			//cIssues+="<h3>Country:"+rightCountryData.country+"</h3><br><br>"
			//cIssues+="Trade:"+rightCountryData.trade+"<br><br>"
			//cIssues+="IP:"+rightCountryData.intellectual_property+"<br><br>"
			//cIssues+="Justice:"+rightCountryData.justice+"<br><br>"
			//cIssues+="Environment:"+rightCountryData.enviroment
			cIssues+=`<div id="chartContainer" style="height: 300px; width: 100%;"></div>`

			console.log(cIssues)
			$("#popupCIssues")
				.html(cIssues);

			window.onload = function () {

				var chart = new CanvasJS.Chart("chartContainer", {
					animationEnabled: true,

					title: {
						text: "Country: Thailand"
					},
					axisX: {
						interval: 1
					},
					axisY2: {
						interlacedColor: "rgba(1,77,101,.2)",
						gridColor: "rgba(0, 0, 255, 0.5)",
						title: "Issues"
					},
					data: [{
						type: "bar",
						name: "companies",
						axisYType: "secondary",
						color: "#014D65",
						dataPoints: [
							{ y: parseInt(rightCountryData.enviroment), label: "Environment" },
							{ y: parseInt(rightCountryData.justice), label: "Justice" },
							{ y: parseInt(rightCountryData.intellectual_property), label: "IP" },
							{ y: parseInt(rightCountryData.trade), label: "Trade" }
						]
					}]
				});
				chart.render();

			}

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
	  <input  style="color: red; background-color:red" id="issue`+ i + 1 + `" width:'100%' data-slider-id='issue` + (parseInt(i) + 1) + `Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="50"/>
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
						return 'Current ' + leftStateData.issues[i].topic + ' value: ' + value;
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
		// $.cookie('stateVal', 1, { expires: 7, path: '/',
		//  secure: true });

		//  Cookies.set('stateVal', '1', { expires: 7 });


		//  console.log("statval:")
		// console.log(	 Cookies.get('stateVal')); // => 'the_value'




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