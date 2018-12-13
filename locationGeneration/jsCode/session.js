class Session{
	constructor(id, startTime){
		this.id_user = id;
		this.dataPoints = [];
		this.startTime = startTime;
	}


	setSessionPoints (route, speed, sampleRate, closedLoop){

		let lastTimeStamp;

		for (var i = 0; i < route.routePoints.length-1; i++) {

			let startCoords = new Position(route.routePoints[i].lat, route.routePoints[i].lon);

		    let endCoords = new Position(route.routePoints[i+1].lat, route.routePoints[i+1].lon);


			if (this.dataPoints.length > 0 ){
				
				lastTimeStamp = this.dataPoints[this.dataPoints.length-1].time + +sampleRate.value;
			
			} else {

				// timeStamp of first corner point
				lastTimeStamp = 0;
			}

			// add cornerPoint

			let tmpDataPoints =  calculateStepsBetweenPositions(startCoords, endCoords, speed.value, sampleRate.value, lastTimeStamp);

		    this.dataPoints.push.apply(this.dataPoints,tmpDataPoints);
			
		}

		if (closedLoop){

			let startCoords = new Position(route.routePoints[route.routePoints.length-1].lat, route.routePoints[route.routePoints.length-1].lon);

		    let endCoords = new Position(route.routePoints[0].lat, route.routePoints[0].lon);

		    lastTimeStamp = this.dataPoints[this.dataPoints.length-1].time + +sampleRate.value;

			// Using locationTools.js
			let tmpDataPoints =  calculateStepsBetweenPositions(startCoords, endCoords, speed.value, sampleRate.value, lastTimeStamp);

		    this.dataPoints.push.apply(this.dataPoints,tmpDataPoints);

		    // add last position point

		    lastTimeStamp = this.dataPoints[this.dataPoints.length-1].time + +sampleRate.value;

		    let tmpDP = new DataPoint(0, endCoords, speed, lastTimeStamp);

		    this.dataPoints.push(tmpDP);

		}

		

	}

	saveRouteJSON (){
		console.log("SEE INSTRUCTIONS AT: https://eligrey.com/demos/FileSaver.js/");
	}
}